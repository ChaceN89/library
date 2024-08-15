"""
bookSerializer.py

Serializers for the Book application.

This file defines the 'BookSerializer' used to convert 'Book' instances into JSON format and validate incoming data.
It is used for serializing book data for API responses and requests.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import serializers
from api.models.book import Book

class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for the Book model.
    """
    class Meta:
        model = Book
        fields = '__all__'  # Include all fields of the Book model
        read_only_fields = ('created_at', 'updated_at', 'owner')  # Make fields read-only

    def validate(self, data):
        """
        Additional validation for the Book model.
        """
        # Add any custom validation if needed
        return data