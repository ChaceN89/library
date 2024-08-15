"""
admin_crud.py

ViewSet for performing CRUD operations on User model, restricted to admin users.

This file defines the `AdminUserViewSet` class for managing user data, accessible only to users with admin privileges.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import viewsets
from django.contrib.auth.models import User
from api.serializers.userSerializer import UserSerializer
from rest_framework.permissions import IsAdminUser

class AdminUserViewSet(viewsets.ModelViewSet):
    """
    A viewset for CRUD operations on the User model.

    This viewset provides default `list`, `create`, `retrieve`, `update`, and `destroy` actions for User objects.
    Access to these actions is restricted to admin users only.

    Attributes:
        queryset (QuerySet): The queryset of User objects.
        serializer_class (Serializer): The serializer class used for serialization and deserialization.
        permission_classes (list): The list of permission classes to restrict access to admin users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only admins can access these routes
