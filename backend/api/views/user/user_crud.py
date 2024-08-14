from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import MethodNotAllowed
from api.serializers.userSerializer import UserSerializer
from django.contrib.auth.models import User

class UserCRUDViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    def get_queryset(self):
        # Restrict users to only their own data
        return User.objects.filter(id=self.request.user.id)

    def create(self, request, *args, **kwargs):
        # Disallow creation of new users via this viewset
        raise MethodNotAllowed("POST", detail="User creation is not allowed via this route.")

    def perform_update(self, serializer):
        # Prevent unauthorized changes to sensitive fields
        restricted_fields = [
            'is_superuser', 
            'is_staff', 
            'user_permissions', 
            'groups', 
            'date_joined', 
            'last_login', 
            'is_active'
        ]
        if any(field in serializer.validated_data for field in restricted_fields):
            if not self.request.user.is_superuser:
                raise PermissionDenied("You do not have permission to change these fields.")
        serializer.save()

    def perform_destroy(self, instance):
        # Prevent users from deleting superuser accounts
        if instance.is_superuser:
            raise PermissionDenied("You cannot delete a superuser account.")
        instance.delete()
