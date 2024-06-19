# admin.py is a file that allows you to register your models with the Django admin application.
from django.contrib import admin
from .models import Book

# Register the Book model with the admin site
admin.site.register(Book)
