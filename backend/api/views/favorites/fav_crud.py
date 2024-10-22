# views/favorites/fav_crud.py
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models.favoriteBooks import FavoriteBook
from api.models.book import Book
from api.serializers.bookSerializer import BookSerializer


class FavoriteBookViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def add_favorite(self, request, pk=None):
        """Adds a book to the user's favorites."""
        try:
            book = Book.objects.get(pk=pk)
            # Check if already favorited
            if FavoriteBook.objects.filter(user=request.user, book=book).exists():
                return Response({"detail": "Book is already in favorites."}, status=status.HTTP_400_BAD_REQUEST)

            FavoriteBook.objects.create(user=request.user, book=book)
            return Response({"detail": "Book added to favorites."}, status=status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            return Response({"detail": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['delete'])
    def remove_favorite(self, request, pk=None):
        """Removes a book from the user's favorites."""
        try:
            book = Book.objects.get(pk=pk)
            favorite = FavoriteBook.objects.filter(user=request.user, book=book)
            if favorite.exists():
                favorite.delete()
                return Response({"detail": "Book removed from favorites."}, status=status.HTTP_204_NO_CONTENT)
            return Response({"detail": "Book not in favorites."}, status=status.HTTP_400_BAD_REQUEST)
        except Book.DoesNotExist:
            return Response({"detail": "Book not found."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def get_favorites(self, request):
        """Get all favorite books of the user."""
        """Get all favorite books of the user."""
        # Get all the favorite book entries for the user
        favorite_books = FavoriteBook.objects.filter(user=request.user).values_list('book', flat=True)

        # Retrieve the book objects for those favorite books
        books = Book.objects.filter(id__in=favorite_books)

        # Serialize the books and return their data
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)