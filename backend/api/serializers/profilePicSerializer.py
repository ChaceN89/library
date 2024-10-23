# serializers.py

from rest_framework import serializers

class ProfileImageSerializer(serializers.Serializer):
    """
    Serializer for handling profile image uploads.
    """
    profile_image = serializers.ImageField()

    def validate_profile_image(self, value):
        """
        Ensure the uploaded file is an image.
        """
        if not value.content_type.startswith('image/'):
            raise serializers.ValidationError("The uploaded file must be an image.")
        return value
