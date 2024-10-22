# serializers/favouritesSerializer.py
from rest_framework import serializers
from api.models.favoriteBooks import FavoriteBook

class FavoriteBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteBook
        fields = ['user', 'book']
