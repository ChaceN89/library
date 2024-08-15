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

class LoginView(TokenObtainPairView):
    """
    API view to obtain JWT tokens for user authentication.

    Provides a POST endpoint for users to obtain a JWT token pair (access and refresh tokens).
    The endpoint is accessible to anyone, allowing public access to authentication.

    Attributes:
        permission_classes (list): A list of permission classes. This view is accessible to all users.
    """
    permission_classes = [AllowAny]  # Public access to obtain tokens
