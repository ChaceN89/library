"""
book.py

Models for the Book application.

This file defines the 'Book' model used to represent books in the library. It includes fields for
the title, timestamps, cover art, content URL, and statistics such as downloads and views.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-09-20
@since 1.0
"""

from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    """
    Represents a book in the library.

    Attributes:
        title (str): The title of the book.
        description (str): A brief description of the book (default is empty).
        author (str): The author of the book.
        genre (str): The genre of the book.
        published_date (date): The date the book was published.
        language (str): The language the book is written in (default is English).
        updated_at (datetime): Timestamp for when the book was last updated (auto-managed).
        created_at (datetime): Timestamp for when the book was created (auto-managed).
        cover_art_url (str): URL of the book's cover art (optional).
        content_url (str): URL of the book's content (optional).
        downloads (int): Number of times the book has been downloaded (default is 0).
        views (int): Number of times the book has been viewed (default is 0).
    """
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)  # Set a default and increase max_length
    author = models.CharField(max_length=255, default="Unknown Author")
    genre = models.CharField(max_length=255, default="Unknown Genre")
    published_date = models.DateField(null=True, blank=True)  # Allow null and blank for optional dates
    language = models.CharField(max_length=100, default="English")

    downloads = models.IntegerField(default=0)
    views = models.IntegerField(default=0)

    content_url = models.URLField(max_length=200)
    cover_art_url = models.URLField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  # Example default value

    def __str__(self):
        """
        Returns a string representation of the book.

        Returns:
            str: The title of the book.
        """
        return self.title
