"""
admin_crud.py

ViewSet for performing CRUD operations on User model, restricted to admin users.

This file defines the `AdminUserViewSet` class for managing user data, accessible only to users with admin privileges.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.0
"""

from rest_framework import viewsets
from django.contrib.auth.models import User
from api.serializers.userSerializer import UserSerializer
from rest_framework.permissions import IsAdminUser
from api.models.book import Book
from api.aws.delete import delete_file_from_s3

class AdminUserViewSet(viewsets.ModelViewSet):
    """
    A viewset for CRUD operations on the User model.

    This viewset provides default `list`, `create`, `retrieve`, `update`, and `destroy` actions for User objects.
    Access to these actions is restricted to admin users only.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class used for serialization and deserialization.
        permission_classes (list): The list of permission classes to restrict access to admin users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only admins can access these routes

    def perform_destroy(self, instance):
        """
        Delete all associated books and profile pictures (including S3 files) when an admin deletes a user.
        
        Args:
            instance (User): The user instance to be deleted.
        """
        # Fetch all books owned by the user
        books = Book.objects.filter(owner=instance)

        # Loop through each book and delete associated files from S3
        for book in books:
            if book.content_url:
                delete_file_from_s3(book.content_url)  # Delete book content file from S3
            if book.cover_art_url:
                delete_file_from_s3(book.cover_art_url)  # Delete cover art file from S3
            book.delete()

        # Check if the user has an associated profile picture and delete the image from S3
        if hasattr(instance, 'profile_picture') and instance.profile_picture.profile_image_url:
            delete_file_from_s3(instance.profile_picture.profile_image_url)
            instance.profile_picture.delete()

        # Finally, delete the user instance (which cascades other related objects)
        instance.delete()

