"""
comment_public.py

Views for publicly retrieving comments and their nested replies for a specific book.

This file defines the 'CommentPublicViewSet' for unauthenticated and authenticated users to view all comments related to a specific book. 
This includes all top-level comments and their nested replies (threaded comments).

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.models.comment import Comment
from api.serializers.commentSerializer import CommentSerializer

class CommentPublicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for publicly retrieving comments related to a specific book, 
    including all nested replies (threaded comments).
    """
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Retrieve all top-level comments for the specified book.
        """
        book_id = self.kwargs.get('pk')  # Assuming the book ID is passed as a URL parameter
        return Comment.objects.filter(book_id=book_id, parent_comment__isnull=True)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve all top-level comments for the book specified by its ID, including nested replies.
        """
        book_id = kwargs.get('pk')
        queryset = self.get_queryset().filter(book_id=book_id)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
