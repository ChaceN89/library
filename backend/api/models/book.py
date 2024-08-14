from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    cover_art_url = models.URLField(max_length=1024, blank=True, null=True)
    content_url = models.URLField(max_length=1024, blank=True, null=True)
    downloads = models.IntegerField(default=0)
    views = models.IntegerField(default=0)

    def __str__(self):
        return self.title
