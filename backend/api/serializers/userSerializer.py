"""
userSerializer.py

Serializers for user-related operations.

This file defines serializers for handling User data. 
It includes:
- `PublicUserSerializer` for public-facing operations such as account creation.
- `UserSerializer` for authenticated user CRUD operations.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.0
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from django.conf import settings  # Import settings to access the DEFAULT_PROFILE_PIC_URL


# Public User Serializer (used for public operations like account creation)
class PublicUserSerializer(serializers.ModelSerializer):
    """
    Serializer for public user operations, such as account creation.

    Attributes:
        id (int): Unique identifier for the user.
        username (str): Username of the user.
        first_name (str): First name of the user.
        last_name (str): Last name of the user.
        email (str): Email address of the user.
        profile_image_url (str): URL of the user's profile image (read-only).
    """
    # Add profile_image_url to the serializer (read-only)
    profile_image_url = serializers.CharField(source='profile_picture.profile_image_url', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'profile_image_url']  # Include password for account creation
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        """
        Create and return a new user instance.

        Uses `create_user` to handle password hashing.

        Args:
            validated_data (dict): Data validated by the serializer.

        Returns:
            User: The created user instance.
        """
        user = User.objects.create_user(**validated_data)  # Use create_user to handle password hashing
        return user

# Private User Serializer (used for private CRUD operations)
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for authenticated user CRUD operations.

    Attributes:
        id (int): Unique identifier for the user.
        username (str): Username of the user.
        first_name (str): First name of the user.
        last_name (str): Last name of the user.
        email (str): Email address of the user.
        password (str): Password for the user (write-only).
        profile_image_url (str): URL of the user's profile image (or default if none is set).
    """
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'profile_image_url']  # Add profile_image_url

    def get_profile_image_url(self, obj):
        """
        Method to retrieve the profile image URL or the default URL if not available.
        """
        if hasattr(obj, 'profile_picture') and obj.profile_picture.profile_image_url:
            return obj.profile_picture.profile_image_url
        # Default profile image URL
        return settings.DEFAULT_PROFILE_PIC_URL
