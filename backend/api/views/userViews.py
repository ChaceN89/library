from rest_framework import viewsets
from django.contrib.auth.models import User  # Import Django's default User model
from api.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
