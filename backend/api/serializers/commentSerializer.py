"""
commentSerializer.py

Serializers for the Comment application.

This file defines the 'CommentSerializer' used to convert 'Comment' instances into JSON format and validate incoming data.
It is used for serializing comment data for API responses and requests, including support for nested comments (replies).

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-10-10
@since 1.0
"""
from rest_framework import serializers
from api.models.comment import Comment
from django.contrib.auth.models import User
from django.conf import settings  # Import settings to access the default profile picture

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()  # To handle nested comments
    user_username = serializers.CharField(source='user.username', read_only=True)  # Add the username field
    user_profile_pic = serializers.SerializerMethodField()  # Add the profile picture field

    class Meta:
        model = Comment
        fields = ['id', 'created_at', 'updated_at', 'is_edited', 'content', 'book', 'user', 'user_username', 'user_profile_pic', 'parent_comment', 'replies']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_edited', 'user', 'user_username', 'user_profile_pic']

    def get_replies(self, obj):
        """
        Recursively serialize all replies to a comment.
        """
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True).data
        return []

    def get_user_profile_pic(self, obj):
        """
        Get the profile picture URL for the user who made the comment.
        If the user doesn't have a profile picture, return the default profile picture.
        """
        try:
            # Try to get the user's profile picture
            if obj.user.profile_picture and obj.user.profile_picture.profile_image_url:
                return obj.user.profile_picture.profile_image_url
        except User.profile_picture.RelatedObjectDoesNotExist:
            # If no profile picture exists, return the default profile picture
            return settings.DEFAULT_PROFILE_PIC_URL

    def create(self, validated_data):
        """
        Override the create method to automatically set the user and handle comment creation.
        """
        request = self.context.get('request')
        if request and request.user:
            validated_data['user'] = request.user
        return super().create(validated_data)

    def validate(self, data):
        """
        Ensure that the parent comment belongs to the same book.
        """
        parent_comment = data.get('parent_comment')
        book = data.get('book')

        if parent_comment and parent_comment.book != book:
            raise serializers.ValidationError("Parent comment is associated with a different book.")

        return data
