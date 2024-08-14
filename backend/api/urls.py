from django.urls import path, include
from rest_framework.routers import DefaultRouter

# admin views
from api.views.admin.admin_crud import AdminUserViewSet

# user views
from api.views.user.create_account import UserCreateView
from api.views.user.user_crud import UserCRUDViewSet
from api.views.user.login import LoginView

# book views - when created 

# comment views  - when created

# testing views
from api.views.testing.testing_viewset import TestingViewSet

# Router setup for private user CRUD operations
router = DefaultRouter()
router.register(r'admin/users', AdminUserViewSet, basename='admin-user')  # Admin-specific CRUD operations
router.register(r'users', UserCRUDViewSet, basename='user')  # Private CRUD for users
router.register(r'testing', TestingViewSet, basename='testing')  # Testing routes

urlpatterns = [
    # Public Routes
    # craete account, login
    path('api/register/', UserCreateView.as_view(), name='user_create'),  # Public Account Creation
    path('api/login/', LoginView.as_view(), name='user_login'),  # Public Login
    
    # Private Routes (handled by the router) - given prefix api/ for all private routes
    path('api/', include(router.urls)),
]
