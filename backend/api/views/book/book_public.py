"""
book_public.py

Viewset for public access to book routes. This includes endpoints for retrieving
all books and fetching a book by its ID.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.serializers.bookSerializer import BookSerializer
from api.models.book import Book

class PublicBookViewSet(viewsets.ViewSet):
    """
    Viewset for public access to book routes.
    """
    
    permission_classes = [AllowAny]  # Ensure that all actions are accessible to any user
    
    def list(self, request):
        """
        Retrieve all books.
        """
        queryset = Book.objects.all()
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        """
        Retrieve a specific book by ID.
        """
        queryset = Book.objects.all()
        book = queryset.filter(pk=pk).first()
        if book is None:
            return Response({"detail": "Not found."}, status=404)
        serializer = BookSerializer(book)
        return Response(serializer.data)
