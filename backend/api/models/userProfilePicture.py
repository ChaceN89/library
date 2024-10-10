"""
userProfilePicture.py

This module defines the UserProfilePicture model, which stores the URL of a user's profile image.
It includes functionality for automatically deleting the associated image from AWS S3 when the 
user profile picture record is deleted.

The model has a one-to-one relationship with the Django User model and stores the image's URL as a field. 
It ensures that when a profile picture is deleted, the associated image in the S3 bucket is also removed.

Author: Chace Nielson
Created: 2024-10-10
Updated: 2024-10-10
"""from django.db import models
from django.contrib.auth.models import User
from api.aws.delete import delete_file_from_s3  # Ensure you have this method to delete from S3

class UserProfilePicture(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_picture')
    profile_image_url = models.URLField(max_length=255, null=True, blank=True)  # URL of the S3 profile image

    def __str__(self):
        return self.user.username

    def delete(self, *args, **kwargs):
        # Extract the file key from the S3 URL
        if self.profile_image_url:
            delete_file_from_s3(self.profile_image_url)
        # Call the superclass delete method to remove the record from the database
        super().delete(*args, **kwargs)