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
from api.views.testing.testing_viewset import TestingViewSet
from api.views.admin.admin_crud import AdminUserViewSet

from api.views.user.user_crud import UserCRUDViewSet
from api.views.user.login import LoginView
from api.views.user.create_account import UserCreateView

from api.views.book.book_crud import BookCRUDViewSet
from api.views.book.book_public import PublicBookViewSet

from api.views.comment.comment_crud import CommentCRUDViewSet
from api.views.comment.comment_public import CommentPublicViewSet


# Router setup for different CRUD operations
router = DefaultRouter()
router.register(r'admin/users', AdminUserViewSet, basename='admin-user')  # Admin-specific CRUD operations
router.register(r'testing', TestingViewSet, basename='testing')  # Testing routes
router.register(r'users', UserCRUDViewSet, basename='user')  # Private CRUD for users
router.register(r'books', BookCRUDViewSet, basename='book')  # Private CRUD for books
router.register(r'comment', CommentCRUDViewSet, basename='comment')  # Private CRUD for comments
router.register(r'public-comments', CommentPublicViewSet, basename='public-comments')



urlpatterns = [
    # Public Routes
    path('api/register/', UserCreateView.as_view(), name='user_create'),  # Route for public account creation
    path('api/login/', LoginView.as_view(), name='user_login'),  # Route for public login

    # Custom Public Book Routes
    path('api/public/books/', PublicBookViewSet.as_view({'get': 'list'}), name='public_books_list'),  # Get all books
    path('api/public/books/<int:pk>/', PublicBookViewSet.as_view({'get': 'retrieve'}), name='public_books_detail'),  # Get book by ID
    
    # Add routes for incrementing views and downloads
    path('api/public/books/<int:pk>/increment_views/', PublicBookViewSet.as_view({'post': 'increment_views'}), name='public_books_increment_views'),
    path('api/public/books/<int:pk>/increment_downloads/', PublicBookViewSet.as_view({'post': 'increment_downloads'}), name='public_books_increment_downloads'),

    # Private Routes (handled by the router) - all routes prefixed with 'api/'
    path('api/', include(router.urls)),
]
