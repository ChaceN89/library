"""
login.py

Handles user authentication functionality for the Library API.

This file defines the `LoginView` and `GoogleLoginView` classes, which provide endpoints for obtaining JWT tokens
and authenticating users with Google.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from api.serializers.userSerializer import PublicUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
import requests as fetchRequest  # This is the correct requests library for making HTTP requests

from rest_framework import status
from django.core.files.base import ContentFile

from django.conf import settings  # Import settings to access the GOOGLE_CLIENT_ID

from api.models.userProfilePicture import UserProfilePicture
from api.aws.upload import upload_file_to_s3

import uuid



class LoginView(TokenObtainPairView):
    """
    API view to obtain JWT tokens for user authentication and return user data.
    """
    permission_classes = [AllowAny]  # Public access to obtain tokens

    def post(self, request, *args, **kwargs):
        # Call the original view to get the token data
        response = super().post(request, *args, **kwargs)

        # Get user data
        user = User.objects.get(username=request.data['username'])
        user_data = PublicUserSerializer(user).data

        # Add user data to the response
        response.data['user'] = user_data
        return response

class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        print("\n\ngoogle value " + settings.GOOGLE_CLIENT_ID + "\n\n")

        try:
            # Use GOOGLE_CLIENT_ID from settings
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_CLIENT_ID)

            # Extract user information from the token
            email = idinfo.get("email")
            first_name = idinfo.get("given_name", "")
            last_name = idinfo.get("family_name", "")
            picture = idinfo.get("picture", "")

            # Check if the user exists or create a new one
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "username": email,  # Ensure the username is unique in your model
                    "first_name": first_name,
                    "last_name": last_name,
                },
            )

            # if google provides an image copy it and uplaod the new img to s3

            # ONly happens if a user is creating an account
            if picture and created:
                print("\n\n users google account has a google image")

                response = fetchRequest.get(picture, stream=True)
                response.raise_for_status()
                image_file = ContentFile(response.content, name=f"{uuid.uuid4()}.jpg")

                print("here")

                
                # Handle profile image upload (if provided)
                unique_string = str(uuid.uuid4())  # Generate a unique string for filename
                profile_image_url = upload_file_to_s3(image_file, user.id, 'profile_image', 'image/png', unique_string)
                # Create or update the profile picture record for the user
                UserProfilePicture.objects.update_or_create(user=user, profile_image_url=profile_image_url)

                print("here2")
            else:
                print("\nUser has already been rcreate\n")
     
            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)

            # Serialize user data
            user_data = PublicUserSerializer(user).data

            return Response({
                "accessToken": str(refresh.access_token),
                "refreshToken": str(refresh),
                "user": user_data,
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            # Log the error for debugging purposes
            print("Google token validation failed:", str(e))
            return Response({"error": "Invalid Google token", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)