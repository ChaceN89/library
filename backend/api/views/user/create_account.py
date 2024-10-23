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
from api.models.userProfilePicture import UserProfilePicture
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
import uuid

class UserCreateView(generics.CreateAPIView):
    """
    API view to create a new user account and return JWT tokens along with user data.
    """
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]  # Allow file uploads and form data

    def perform_create(self, serializer):
        user = serializer.save()  # Save the user instance

        # Handle profile image upload (if provided)
        profile_image = self.request.FILES.get('profile_image')
        if profile_image:
            unique_string = str(uuid.uuid4())  # Generate a unique string for filename
            profile_image_url = upload_file_to_s3(profile_image, user.id, 'profile_image', 'image/png', unique_string)
            UserProfilePicture.objects.create(user=user, profile_image_url=profile_image_url) 

    def create(self, request, *args, **kwargs):
        """Overrides the default create method to include JWT tokens and user data in the response."""
        response = super().create(request, *args, **kwargs)

        # Attach JWT tokens to the response
        user = self.queryset.get(username=request.data['username'])
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Add tokens and user data to the response
        response.data = {
            'user': response.data,
            'access': access_token,
            'refresh': refresh_token
        }

        return response
