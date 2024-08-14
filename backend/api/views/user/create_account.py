from rest_framework import generics
from api.serializers.userSerializer import PublicUserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    permission_classes = [AllowAny]  # Public access to create accounts
