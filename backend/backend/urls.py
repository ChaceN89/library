"""
URL configuration for the backend project.

This file contains the URL patterns for the project, including the admin interface,
API endpoints, Swagger documentation and Google OAuth login.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings  # Import settings to access the DEFAULT_PROFILE_PIC_URL

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Schema view for Swagger documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Page Flow Library API",
        default_version=settings.APP_VERSION,
        description="API documentation for the Library app",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@library.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # The documentation is public
    permission_classes=(permissions.AllowAny,),  # Allows any user to access the documentation - Makes Swagger accessible without authentication
)

urlpatterns = [
    # Admin interface route
    path('admin/', admin.site.urls),
    
    # Include the API URLs from the api.urls module
    path('', include('api.urls')),
    
    # Swagger documentation route
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # path('swagger.yaml', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # go to http://127.0.0.1:8000/swagger.yaml to download documentation 

    # JWT token authentication routes for getting and refreshing tokens
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
