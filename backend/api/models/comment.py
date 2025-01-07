"""
comment.py

Models for the Comment application.

This file defines the 'Comment' model used to represent comments made by users on books in the library.
It includes fields for timestamps, content, associations with books and users, and support for threaded comments.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from django.db import models
from .book import Book
from django.contrib.auth.models import User  # Use Django's default User model

class Comment(models.Model):
    """
    Represents a comment on a book made by a user.

    Attributes:
        created_at (datetime): Timestamp for when the comment was created (auto-managed).
        updated_at (datetime): Timestamp for when the comment was last updated (auto-managed).
        is_edited (bool): Indicates whether the comment has been edited (default is False).
        content (str): The content of the comment.
        book (ForeignKey): Reference to the Book the comment is associated with.
        user (ForeignKey): Reference to the User who made the comment.
        parent_comment (ForeignKey): Reference to a parent comment for threaded replies (optional).
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_edited = models.BooleanField(default=False)
    content = models.TextField()
    is_deleted = models.BooleanField(default=False)  # New field to mark comments as deleted
    book = models.ForeignKey(Book, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)  # Reference to Django's User model
    parent_comment = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        """
        Returns a string representation of the comment.

        Returns:
            str: A string indicating the username of the commenter and the title of the book.
        """
        return f"Comment by {self.user.username} on {self.book.title}"
