# urls.py is the file that Django uses to route URLs to views. In this case, we are using the DefaultRouter class from the rest_framework.routers module to automatically generate the URLs for our BookViewSet viewset. We then include these URLs in the urlpatterns list.
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, dummy_var_view, TestView

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'books', BookViewSet)

# Define the URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('dummy-var/', dummy_var_view, name='dummy_var'),
    path('test/', TestView.as_view(), name='test_view'),
]