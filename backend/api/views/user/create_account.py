"""
create_account.py

Handles user account creation functionality for the Library API.

This file defines the `UserCreateView` class, which provides an endpoint for creating new user accounts.
The endpoint is publicly accessible.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import generics
from api.serializers.userSerializer import PublicUserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class UserCreateView(generics.CreateAPIView):
    """
    API view to create a new user account.

    Provides a POST endpoint to register new users. The endpoint is accessible to anyone,
    allowing for public account creation.

    Attributes:
        queryset (QuerySet): A QuerySet of all User objects.
        serializer_class (Serializer): The serializer class used for creating users.
        permission_classes (list): A list of permission classes. This view is accessible to all users.
    """
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    permission_classes = [AllowAny]  # Public access to create accounts
