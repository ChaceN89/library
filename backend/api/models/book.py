"""
book.py

Models for the Book application.

This file defines the 'Book' model used to represent books in the library. It includes fields for
the title, timestamps, cover art, content URL, and statistics such as downloads and views.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from django.db import models

class Book(models.Model):
    """
    Represents a book in the library.

    Attributes:
        title (str): The title of the book.
        updated_at (datetime): Timestamp for when the book was last updated (auto-managed).
        created_at (datetime): Timestamp for when the book was created (auto-managed).
        cover_art_url (str): URL of the book's cover art (optional).
        content_url (str): URL of the book's content (optional).
        downloads (int): Number of times the book has been downloaded (default is 0).
        views (int): Number of times the book has been viewed (default is 0).
    """
    title = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cover_art_url = models.URLField(max_length=1024, blank=True, null=True)
    content_url = models.URLField(max_length=1024, blank=True, null=True)
    downloads = models.IntegerField(default=0)
    views = models.IntegerField(default=0)

    def __str__(self):
        """
        Returns a string representation of the book.

        Returns:
            str: The title of the book.
        """
        return self.title
