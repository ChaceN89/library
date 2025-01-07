"""
comment_crud.py

Views for managing Comment CRUD operations.

This file defines the 'CommentCRUDViewSet' for authenticated users to perform create, update, and delete operations
on comments. Users can comment on books and reply to other comments, forming a nested thread of comments.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from api.serializers.commentSerializer import CommentSerializer
from api.models.comment import Comment
from rest_framework.response import Response

class CommentCRUDViewSet(viewsets.ModelViewSet):
    """
    ViewSet for performing CRUD operations on Comment objects.

    This ViewSet allows authenticated users to create, update, and delete their own comments.
    Users can only access and modify their own comment records.
    """
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retrieve the list of comments for the authenticated user or for a specific book.
        """
        if self.request.user.is_authenticated:
            # If the book ID is provided in the query params, filter comments by book
            book_id = self.request.query_params.get('book', None)
            if book_id:
                return Comment.objects.filter(book__id=book_id)
            return Comment.objects.filter(user=self.request.user)
        return Comment.objects.none()

    def perform_create(self, serializer):
        """
        Handle comment creation, automatically associating it with the authenticated user.
        """
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        """
        Prevent updating comments that do not belong to the authenticated user.
        """
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to edit this comment.")
        serializer.save(is_edited=True)  # Mark the comment as edited when updated

    def perform_destroy(self, instance):
        """
        Replace the comment content with '[Deleted]' instead of deleting it.
        """
        if instance.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this comment.")
        
        # Replace the comment content with '[Deleted]'
        instance.content = "[Deleted]"
        instance.is_deleted = True  # Add a flag to indicate the comment is deleted (if not already present)
        instance.save()

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific comment by ID.
        """
        instance = self.get_object()
        if instance.user != request.user and instance.book.owner != request.user:
            raise PermissionDenied("You do not have permission to access this comment.")
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
