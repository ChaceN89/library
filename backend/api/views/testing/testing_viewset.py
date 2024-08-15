"""
testing_viewset.py

ViewSet for testing various API endpoints with different access levels.

This file defines the `TestingViewSet` class for testing endpoints that return dummy data and perform basic operations.
The endpoints are used for testing purposes and include both public and private routes.

Author: Chace Nielson
Created: 2024-08-14
Modified: 2024-08-14
@since 1.0
"""

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings

class TestingViewSet(viewsets.ViewSet):
    """
    A viewset for testing various endpoints.

    Provides three actions:
    - `dummy`: Returns a dummy variable.
    - `multiply`: Multiplies two numbers provided in the URL.
    - `private_dummy`: Returns a dummy variable with a 'private_' prefix, accessible only to authenticated users.

    Attributes:
        None
    """

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def dummy(self, request):
        """
        Returns a dummy variable defined in the Django settings.

        This endpoint is public and accessible to everyone.

        Parameters:
            request (Request): The HTTP request object.

        Returns:
            Response: A response containing the dummy variable.
        """
        dummy_var = settings.DUMMY_VAR
        return Response({"dummy_var": dummy_var})

    @action(detail=False, methods=['get'], url_path='multiply/(?P<a>\d+)/(?P<b>\d+)', permission_classes=[AllowAny])
    def multiply(self, request, a=None, b=None):
        """
        Multiplies two numbers provided in the URL.

        This endpoint is public and accessible to everyone.

        Parameters:
            request (Request): The HTTP request object.
            a (int): The first number to multiply.
            b (int): The second number to multiply.

        Returns:
            Response: A response containing the result of the multiplication.
        """
        result = int(a) * int(b)
        return Response({"result": result})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def private_dummy(self, request):
        """
        Returns a dummy variable with a 'private_' prefix.

        This endpoint is restricted to authenticated users only.

        Parameters:
            request (Request): The HTTP request object.

        Returns:
            Response: A response containing the 'private_' prefixed dummy variable.
        """
        private_dummy_var = f"private_{settings.DUMMY_VAR}"
        return Response({"private_dummy_var": private_dummy_var})
