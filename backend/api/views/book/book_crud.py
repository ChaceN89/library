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
import uuid
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from api.serializers.bookSerializer import BookSerializer
from api.models.book import Book
from rest_framework.parsers import MultiPartParser, FormParser
from api.aws.upload import upload_file_to_s3, edit_upload

class BookCRUDViewSet(viewsets.ModelViewSet):
    """
    ViewSet for performing CRUD operations on Book objects.

    This ViewSet allows authenticated users to create, update, and delete their own books.
    Users can only access and modify their own book records.
    """
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)  # Only authenticated users can access this ViewSet

    def get_queryset(self):
        """
        Retrieve the list of books for the authenticated user.
        """
        if self.request.user.is_authenticated:
            return Book.objects.filter(owner=self.request.user)
        return Book.objects.none()
    
    def perform_create(self, serializer):
        """
        Handle file uploads and set URLs for content and cover art.
        """
        content_file = self.request.FILES.get('content')
        cover_art_file = self.request.FILES.get('cover_art')
        title = self.request.data.get('title')

        # default values for content and cover art URLs
        content_url = None
        cover_art_url = None


        unique_string = str(uuid.uuid4())  # Generate a unique string to ensure filename uniqueness

        # Upload content file to S3
        if content_file:
            content_url = upload_file_to_s3(content_file, self.request.user.id, 'content', 'text/plain', unique_string) 

        # Upload cover art file to S3 (if provided)
        if cover_art_file:
            cover_art_url = upload_file_to_s3(cover_art_file, self.request.user.id, 'cover_art', 'image/png', unique_string)

        # Save the book instance
        serializer.save(
            title=title,
            owner=self.request.user,
            content_url=content_url,
            cover_art_url=cover_art_url
        )


    def perform_update(self, serializer):
        """
        Handle file updates and overwrite content or cover art in S3 if provided.
        """
        content_file = self.request.FILES.get('content')
        cover_art_file = self.request.FILES.get('cover_art')
        title = self.request.data.get('title', serializer.instance.title)  # Default to existing title if not provided

        # Retrieve the existing instance to get the URLs
        instance = serializer.instance

        content_url = instance.content_url
        cover_art_url = instance.cover_art_url

        # Overwrite content file in S3 if a new file is provided
        if content_file:
            content_url = edit_upload(content_file, instance.content_url, 'content', instance.owner.id)

        # Overwrite cover art file in S3 if a new file is provided
        if cover_art_file:
            cover_art_url = edit_upload(cover_art_file, instance.cover_art_url, 'cover_art', instance.owner.id)

        # Save the title update (if provided) and other fields
        serializer.save(
            title=title,
            content_url=content_url,
            cover_art_url=cover_art_url
        )


    def perform_destroy(self, instance):
        """
        Prevent deleting books that do not belong to the authenticated user.
        """
        if instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this book.")
        instance.delete()

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific book by ID.
        """
        instance = self.get_object()
        if instance.owner != request.user:
            raise PermissionDenied("You do not have permission to access this book.")
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
