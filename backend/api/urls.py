"""
urls.py

URL configuration for the API app.

This file contains the URL patterns for the API endpoints, including user authentication,
admin operations, and testing routes.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Import viewsets and views
from api.views.admin.admin_crud import AdminUserViewSet

# authentication and user viewsets
from api.views.user.user_crud import UserCRUDViewSet
from api.views.user.login import LoginView
from api.views.user.create_account import UserCreateView

# testing viewsets
from api.views.testing.testing_viewset import TestingViewSet

# book viewsets

# comment viewsets

# Router setup for different CRUD operations
router = DefaultRouter()
router.register(r'admin/users', AdminUserViewSet, basename='admin-user')  # Admin-specific CRUD operations
router.register(r'users', UserCRUDViewSet, basename='user')  # Private CRUD for users
router.register(r'testing', TestingViewSet, basename='testing')  # Testing routes

urlpatterns = [
    # Public Routes
    path('api/register/', UserCreateView.as_view(), name='user_create'),  # Route for public account creation
    path('api/login/', LoginView.as_view(), name='user_login'),  # Route for public login

    # Private Routes (handled by the router) - all routes prefixed with 'api/'
    path('api/', include(router.urls)),
]
