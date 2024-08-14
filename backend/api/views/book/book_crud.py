"""
book_crud.py

Views for managing Book CRUD operations.

This file defines the 'BookCRUDViewSet' for authenticated users to perform create, update, and delete operations
on books. Only authenticated users can access these routes.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from api.serializers.bookSerializer import BookSerializer
from api.models.book import Book

class BookCRUDViewSet(viewsets.ModelViewSet):
    """
    ViewSet for performing CRUD operations on Book objects.

    This ViewSet allows authenticated users to create, update, and delete their own books.
    Users can only access and modify their own book records.
    """
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this ViewSet

    def get_queryset(self):
        """
        Retrieve the list of books for the authenticated user.

        Returns:
            queryset: Books that belong to the current authenticated user.
        """
        return Book.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        """
        Set the owner of the book to the current authenticated user when creating a new book.

        Args:
            serializer (BookSerializer): The serializer instance used for creating the book.
        """
        serializer.save(owner=self.request.user)


    def perform_update(self, serializer):
        """
        Prevent updating books that do not belong to the authenticated user.

        Args:
            serializer (BookSerializer): The serializer instance used for updating the book.
        """
        if serializer.instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to edit this book.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Prevent deleting books that do not belong to the authenticated user.

        Args:
            instance (Book): The book instance to be deleted.
        """
        if instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this book.")
        instance.delete()
