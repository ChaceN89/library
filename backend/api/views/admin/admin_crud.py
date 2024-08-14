from rest_framework import viewsets
from django.contrib.auth.models import User
from api.serializers.userSerializer import UserSerializer
from rest_framework.permissions import IsAdminUser

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]  # Only admins can access these routes
