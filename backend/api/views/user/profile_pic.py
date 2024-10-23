from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from api.aws.upload import upload_file_to_s3
from api.aws.delete import delete_file_from_s3
from api.serializers.profilePicSerializer import ProfileImageSerializer
from api.models.userProfilePicture import UserProfilePicture
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import uuid

class UpdateProfilePictureView(APIView):
    """
    API view to upload or update the profile picture of the authenticated user.
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'profile_image',
                openapi.IN_FORM,
                description="Upload an image file for the profile picture",
                type=openapi.TYPE_FILE,
                required=True,
            )
        ],
        responses={200: 'Profile picture updated successfully', 400: 'Bad request'}
    )
    def post(self, request, *args, **kwargs):
        serializer = ProfileImageSerializer(data=request.data)
        if serializer.is_valid():
            profile_image = serializer.validated_data['profile_image']

            # Delete the old profile image from S3 if it exists
            if hasattr(request.user, 'profile_picture') and request.user.profile_picture.profile_image_url:
                delete_file_from_s3(request.user.profile_picture.profile_image_url)
                request.user.profile_picture.delete()

            # Upload the new profile image to S3
            unique_string = str(uuid.uuid4())
            profile_image_url = upload_file_to_s3(profile_image, request.user.id, 'profile_image', 'image/png', unique_string)

            # Save or update the profile picture in the database
            UserProfilePicture.objects.update_or_create(
                user=request.user,
                defaults={'profile_image_url': profile_image_url}
            )

            return Response({'message': 'Profile picture updated successfully.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
