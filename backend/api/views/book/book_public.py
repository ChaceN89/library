"""
book_public.py

Viewset for public access to book routes. This includes endpoints for retrieving
all books and fetching a book by its ID.

also includes custom actions for incrementing views and downloads for a book. incorporates throttling to limit the rate of these actions.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-09-20
@since 1.0
"""
from rest_framework import viewsets, status  # Add 'status' import
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from api.serializers.bookSerializer import BookSerializer
from api.models.book import Book
from django.core.paginator import Paginator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import action
from django.db.models import Q
from rest_framework.throttling import ScopedRateThrottle

class IncrementThrottle(ScopedRateThrottle):
    scope = 'increments'

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
        search_query = request.query_params.get('search', None)
        sort_by = request.query_params.get('sort_by', 'most_recent')
        genre = request.query_params.get('genre', None)
        language = request.query_params.get('language', None)
        description_search = request.query_params.get('description', False)

        queryset = Book.objects.all()

        # Filter by title, author, and optionally description
        if search_query:
            if description_search == 'true':
                queryset = queryset.filter(
                    Q(title__icontains=search_query) | 
                    Q(author__icontains=search_query) |
                    Q(description__icontains=search_query)
                )
            else:
                queryset = queryset.filter(
                    Q(title__icontains=search_query) | 
                    Q(author__icontains=search_query)
                )

        # Filter by genre and language
        if genre:
            queryset = queryset.filter(genre__icontains=genre)
        if language:
            queryset = queryset.filter(language__icontains=language)

        # Sorting
        if sort_by == 'most_viewed':
            queryset = queryset.order_by('-views')
        elif sort_by == 'least_viewed':
            queryset = queryset.order_by('views')
        elif sort_by == 'most_downloaded':
            queryset = queryset.order_by('-downloads')
        elif sort_by == 'least_downloaded':
            queryset = queryset.order_by('downloads')
        elif sort_by == 'title_asc':  # Sort by title A-Z
            queryset = queryset.order_by('title')
        elif sort_by == 'title_desc':  # Sort by title Z-A
            queryset = queryset.order_by('-title')
        elif sort_by == 'least_recent':
            queryset = queryset.order_by('created_at')
        else:  # Default to most recent
            queryset = queryset.order_by('-created_at')

        # Pagination
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

    @action(detail=True, methods=['post'], throttle_classes=[IncrementThrottle])
    def increment_views(self, request, pk=None):
        """
        Increment the views count for the book.
        """
        try:
            book = Book.objects.get(pk=pk)  # Manually fetch the book object
            book.views += 1
            book.save()
            return Response({'status': 'views incremented', 'views': book.views}, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], throttle_classes=[IncrementThrottle])
    def increment_downloads(self, request, pk=None):
        """
        Increment the downloads count for the book.
        """
        try:
            book = Book.objects.get(pk=pk)  # Manually fetch the book object
            book.downloads += 1
            book.save()
            return Response({'status': 'downloads incremented', 'downloads': book.downloads}, status=status.HTTP_200_OK)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)