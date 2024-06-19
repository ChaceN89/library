# serializers.py:
# This file defines serializers, which convert complex data types like querysets and model instances to native Python data types that can be easily rendered into JSON, XML, or other content types.
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
