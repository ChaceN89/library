"""
create_account.py

Handles user account creation functionality for the Library API.

This file defines the `UserCreateView` class, which provides an endpoint for creating new user accounts.
The endpoint is publicly accessible.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.0
"""
from rest_framework import generics
from api.serializers.userSerializer import PublicUserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from api.aws.upload import upload_file_to_s3
from api.models.userProfilePicture import UserProfilePicture  # Import the UserProfilePicture model
import uuid
from rest_framework.parsers import MultiPartParser, FormParser  # Add parsers for file handling
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class UserCreateView(generics.CreateAPIView):
    """
    API view to create a new user account.

    Provides a POST endpoint to register new users. The endpoint is accessible to anyone,
    allowing for public account creation.
    """
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads and form data

    # Define the form parameters for Swagger UI
    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('username', openapi.IN_FORM, type=openapi.TYPE_STRING, description='Username'),
            openapi.Parameter('first_name', openapi.IN_FORM, type=openapi.TYPE_STRING, description='First name'),
            openapi.Parameter('last_name', openapi.IN_FORM, type=openapi.TYPE_STRING, description='Last name'),
            openapi.Parameter('email', openapi.IN_FORM, type=openapi.TYPE_STRING, description='Email address'),
            openapi.Parameter('password', openapi.IN_FORM, type=openapi.TYPE_STRING, description='Password'),
            openapi.Parameter('profile_image', openapi.IN_FORM, type=openapi.TYPE_FILE, description='Profile image')
        ]
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = serializer.save()  # explicitly save the serializer to create the user

        # Handle profile image upload
        profile_image = self.request.FILES.get('profile_image')
        if profile_image:
            unique_string = str(uuid.uuid4())  # Generate a unique string for filename
            profile_image_url = upload_file_to_s3(profile_image, user.id, 'profile_image', 'image/png', unique_string)
            # Save the profile picture to UserProfilePicture model
            UserProfilePicture.objects.create(user=user, profile_image_url=profile_image_url) 
