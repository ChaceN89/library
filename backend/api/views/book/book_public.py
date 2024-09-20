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
from django.core.paginator import Paginator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class PublicBookViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter('search', openapi.IN_QUERY, description="Search books by title", type=openapi.TYPE_STRING),
            openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
            openapi.Parameter('page_size', openapi.IN_QUERY, description="Number of results per page", type=openapi.TYPE_INTEGER),
        ]
    )
    def list(self, request):
        """
        Retrieve all books with search and pagination functionality.
        """
        search_query = request.query_params.get('search', None)
        queryset = Book.objects.all()

        if search_query:
            queryset = queryset.filter(title__icontains=search_query)

        # Pagination functionality
        page_number = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)
        paginator = Paginator(queryset, page_size)
        page = paginator.get_page(page_number)

        serializer = BookSerializer(page, many=True)
        
        return Response({
            'results': serializer.data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page_number
        })

    def retrieve(self, request, pk=None):
        """
        Retrieve a specific book by ID.
        """
        book = Book.objects.filter(pk=pk).first()
        if book is None:
            return Response({"detail": "Not found."}, status=404)
        serializer = BookSerializer(book)
        return Response(serializer.data)
