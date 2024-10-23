"""
login.py

Handles user authentication functionality for the Library API.

This file defines the `LoginView` class, which provides an endpoint for obtaining JWT tokens.
The endpoint is publicly accessible for logging in users.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from api.serializers.userSerializer import PublicUserSerializer

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
