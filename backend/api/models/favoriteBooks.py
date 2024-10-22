# models/favoriteBooks.py
from django.db import models
from django.contrib.auth.models import User
from api.models.book import Book  # Assuming Book model is in api.models.book

class FavoriteBook(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_books')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='favorited_by')

    class Meta:
        unique_together = ('user', 'book')  # Ensure a user cannot favorite the same book twice

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
