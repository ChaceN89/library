# views/user/change_password.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import serializers

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

class ChangePasswordView(APIView):
    """
    Allows users to change their password.
    """
    permission_classes = [IsAuthenticated]  # User must be logged in

    @swagger_auto_schema(
        request_body=ChangePasswordSerializer,
        responses={
            200: 'Password changed successfully',
            400: 'Old password is incorrect or validation failed'
        }
    )
    def post(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            # Check if old password is correct
            if not user.check_password(old_password):
                return Response({"detail": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            # Validate the new password
            try:
                validate_password(new_password, user=user)
            except ValidationError as e:
                return Response({"detail": e.messages}, status=status.HTTP_400_BAD_REQUEST)

            # Set the new password
            user.set_password(new_password)
            user.save()

            return Response({"detail": "Password changed successfully"}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
