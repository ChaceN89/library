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
from api.views.oAuth.google_oauth_view import google_callback


# Schema view for Swagger documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Library API",
        default_version='v1',
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


    # Route for Google OAuth and allauth login
    path('accounts/', include('allauth.urls')),  # Route for Google OAuth and allauth login

    # Google OAuth callback route
    # path('accounts/google/login/callback/', google_callback, name='google_callback'),

]


# issues 
# developer console edirects
# settings redirects
# urls.py redirects
# frontend redirrect - i think this is ok