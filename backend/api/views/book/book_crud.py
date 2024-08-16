"""
book_crud.py

Views for managing Book CRUD operations.

This file defines the 'BookCRUDViewSet' for authenticated users to perform create, update, and delete operations
on books. Only authenticated users can access these routes.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0

Function Overview:
------------------
- POST /books/       : Create a new book.
    - **Function:** `perform_create(self, serializer)`
    - **Purpose:** Handles the creation of a new book, including file uploads to S3.

- GET /books/        : Retrieve a list of the authenticated user's books.
    - **Function:** `get_queryset(self)`
    - **Purpose:** Defines the queryset to retrieve all books belonging to the authenticated user.
    - **DRF Keyword:** Yes.

- GET /books/{id}/   : Retrieve details of a specific book.
    - **Function:** `retrieve(self, request, *args, **kwargs)`
    - **Purpose:** Retrieves a specific book by its ID, ensuring it belongs to the authenticated user.
    - **DRF Keyword:** Yes.

- PUT /books/{id}/   : Update a specific book.
    - **Function:** `perform_update(self, serializer)`
    - **Purpose:** Handles updating an entire book, including overwriting content or cover art files in S3 if provided.
    - **DRF Keyword:** Partially (`update()` is the standard method; `perform_update()` is a helper function).

- PATCH /books/{id}/ : Partially update a specific book.
    - **Function:** `perform_update(self, serializer)`
    - **Purpose:** Handles updates like the PUT method, but typically only updates the provided fields.
    - **DRF Keyword:** Partially (`update()` is the standard method; `perform_update()` is a helper function).

- DELETE /books/{id}/: Delete a specific book.
    - **Function:** `perform_destroy(self, instance)`
    - **Purpose:** Deletes a specific book from the database and removes the associated files from S3.
    - **DRF Keyword:** Partially (`destroy()` is the standard method; `perform_destroy()` is a helper function).

Notes:
------
- **Django REST framework (DRF) Keywords:**
  - Some of the functions in this ViewSet, such as `get_queryset`, `retrieve`, and `perform_create`, are key methods that DRF uses to handle specific HTTP methods.
  - Other methods, such as `perform_create`, `perform_update`, and `perform_destroy`, are helper functions that can be overridden for custom logic.

- **Custom Logic:**
  - Custom logic is implemented in `perform_create`, `perform_update`, and `perform_destroy` to handle specific tasks such as uploading files to S3 or deleting them when a book is deleted.

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
from api.aws.delete import delete_file_from_s3

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
        Handle the deletion of books and their associated files in S3.
        Prevent deleting books that do not belong to the authenticated user.
        """
        if instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this book.")
        
        # Delete content and cover art files from S3
        if instance.content_url:
            delete_file_from_s3(instance.content_url)
        if instance.cover_art_url:
            delete_file_from_s3(instance.cover_art_url)

        # Delete the book instance from the database
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
