from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings

class TestingViewSet(viewsets.ViewSet):
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def dummy(self, request):
        dummy_var = settings.DUMMY_VAR
        return Response({"dummy_var": dummy_var})

    @action(detail=False, methods=['get'], url_path='multiply/(?P<a>\d+)/(?P<b>\d+)', permission_classes=[AllowAny])
    def multiply(self, request, a=None, b=None):
        result = int(a) * int(b)
        return Response({"result": result})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def private_dummy(self, request):
        private_dummy_var = f"private_{settings.DUMMY_VAR}"
        return Response({"private_dummy_var": private_dummy_var})
