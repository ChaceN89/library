"""
bookSerializer.py

Serializers for the Book application.

This file defines the 'BookSerializer' used to convert 'Book' instances into JSON format and validate incoming data.
It is used for serializing book data for API responses and requests.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.1
"""
from rest_framework import serializers
from api.models.book import Book
from django.core.exceptions import ObjectDoesNotExist  # To handle missing related objects
from django.conf import settings  # Import settings for default profile pic

class BookSerializer(serializers.ModelSerializer):
    content = serializers.FileField(write_only=True, required=True)
    cover_art = serializers.ImageField(write_only=True, required=False)
    
    # Add the owner's username and profile picture
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    owner_profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'description', 'author', 'genre', 'published_date', 
            'language', 'content', 'cover_art', 'content_url', 'cover_art_url', 
            'owner', 'owner_username', 'owner_profile_pic', 'created_at', 
            'updated_at', 'downloads', 'views'
        ]
        read_only_fields = ['id', 'content_url', 'cover_art_url', 'owner', 'owner_username', 'owner_profile_pic', 'created_at', 'updated_at', 'downloads', 'views']

    def get_owner_profile_pic(self, obj):
        """
        Get the profile picture URL for the owner of the book. 
        If no profile picture exists, return the default profile picture URL.
        """
        try:
            # Check if the owner has a profile picture
            if obj.owner.profile_picture and obj.owner.profile_picture.profile_image_url:
                return obj.owner.profile_picture.profile_image_url
        except ObjectDoesNotExist:
            # If the profile picture or related object does not exist, return a default image
            return settings.DEFAULT_PROFILE_PIC_URL

    def create(self, validated_data):
        # Pop content and cover_art from the validated data as they are handled separately
        validated_data.pop('content', None)
        validated_data.pop('cover_art', None)

        # Create and return the Book instance
        book = Book.objects.create(**validated_data)
        return book

    def update(self, instance, validated_data):
        # Handle title if provided
        instance.title = validated_data.get('title', instance.title)

        # Handle content file if provided
        if 'content' in validated_data:
            instance.content = validated_data.pop('content')

        # Handle cover art if provided
        if 'cover_art' in validated_data:
            instance.cover_art = validated_data.pop('cover_art')

        instance.save()
        return instance
