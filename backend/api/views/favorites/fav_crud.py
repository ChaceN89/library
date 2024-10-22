# views/favorites/fav_crud.py
from rest_framework import viewsets, permissions
from api.models.favoriteBooks import FavoriteBook
from api.serializers.favouritesSerializer import FavoriteBookSerializer

class FavoriteBookViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteBookSerializer
    queryset = FavoriteBook.objects.all()
    permission_classes = [permissions.IsAuthenticated]  # Only authenticated users can add favorites

    def get_queryset(self):
        # Return only the current user's favorite books
        return FavoriteBook.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user to the logged-in user when creating a favorite
        serializer.save(user=self.request.user)
