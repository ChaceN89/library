"""
user_crud.py

Handles user CRUD operations for authenticated users in the Library API.

This file defines the `UserCRUDViewSet` class, which provides CRUD functionality for user accounts.
Users can only access and modify their own data. Superuser accounts are protected from deletion and modification.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.0
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import MethodNotAllowed
from api.serializers.userSerializer import UserSerializer
from django.contrib.auth.models import User
from api.models.book import Book  # Import the Book model
from api.aws.delete import delete_file_from_s3  # Import the delete function for S3


class UserCRUDViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user accounts with CRUD operations.

    Only authenticated users can access their own data. 
    Creation of new users is disallowed through this viewset. 
    Superuser accounts are protected from deletion and modification of certain fields.

    Attributes:
        serializer_class (class): The serializer class used for user data.
        permission_classes (list): List of permission classes. This view is restricted to authenticated users.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    def get_queryset(self):
        """
        Restrict the queryset to the current user's data.

        Returns:
            QuerySet: A queryset filtered to only include the current user.
        """
        return User.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        """
        Disallow user creation via this viewset.

        Raises:
            MethodNotAllowed: Indicates that POST requests are not allowed for user creation.
        """
        raise MethodNotAllowed("POST", detail="User creation is not allowed via this route.")

    def perform_update(self, serializer):
        """
        Prevent unauthorized changes to sensitive user fields.

        Checks if the user is trying to modify restricted fields. 
        If so, raises a PermissionDenied exception if the user is not a superuser.

        Args:
            serializer (Serializer): The serializer instance used for updating the user data.
        
        Raises:
            PermissionDenied: Raised if a non-superuser attempts to modify restricted fields.
        """
        restricted_fields = [
            'is_superuser', 
            'is_staff', 
            'user_permissions', 
            'groups', 
            'date_joined', 
            'last_login', 
            'is_active'
        ]
        if any(field in serializer.validated_data for field in restricted_fields):
            if not self.request.user.is_superuser:
                raise PermissionDenied("You do not have permission to change these fields.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Prevent deletion of superuser accounts.

        Checks if the user being deleted is a superuser and raises a PermissionDenied exception if so.

        Args:
            instance (User): The user instance to be deleted.
        
        Raises:
            PermissionDenied: Raised if the user to be deleted is a superuser.

        Custom logic to delete associated books and their files in S3
        when a user is deleted.        
        """
        # Fetch all books owned by the user
        books = Book.objects.filter(owner=instance)

        # Loop through each book and delete associated files from S3
        for book in books:
            # Delete content file from S3
            if book.content_url:
                delete_file_from_s3(book.content_url)
            # Delete cover art file from S3 (if available)
            if book.cover_art_url:
                delete_file_from_s3(book.cover_art_url)
            
            # Delete the book itself from the database
            book.delete()

        # Now, delete the user instance (this also cascades to other related objects)
        instance.delete()
