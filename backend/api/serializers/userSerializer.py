"""
userSerializer.py

Serializers for user-related operations.

This file defines serializers for handling User data. 
It includes:
- `PublicUserSerializer` for public-facing operations such as account creation.
- `UserSerializer` for authenticated user CRUD operations.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import serializers
from django.contrib.auth.models import User

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
        password (str): Password for the user (write-only).
    """
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']  # Include password for account creation
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
        is_active (bool): Indicates whether the user account is active.
        is_superuser (bool): Indicates whether the user has superuser privileges.
        is_staff (bool): Indicates whether the user has staff privileges.
        ... (other fields) ...
    """
    class Meta:
        model = User
        fields = '__all__'  # All fields for authenticated users

    def update(self, instance, validated_data):
        """
        Update and return an existing user instance.

        Handles password updates separately to ensure password hashing.

        Args:
            instance (User): The user instance to be updated.
            validated_data (dict): Data validated by the serializer.

        Returns:
            User: The updated user instance.
        """
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)  # Set the new password and hash it
            user.save()
        return user
