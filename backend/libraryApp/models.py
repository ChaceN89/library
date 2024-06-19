# models.py
# the models used by the application are defined. The Book model is defined with the following fields in the class Book:
from django.db import models

# Define a model for the Book
class Book(models.Model):
    title = models.CharField(max_length=200)  # Title of the book
    author = models.CharField(max_length=200)  # Author of the book
    description = models.TextField()  # Description of the book
    upload_date = models.DateTimeField(auto_now_add=True)  # Automatically set the field to now when the object is first created
    file_url = models.URLField()  # URL to the file containing the book

    def __str__(self):
        return self.title  # String representation of the model
