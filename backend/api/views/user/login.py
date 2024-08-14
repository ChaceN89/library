from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]  # Public access to obtain tokens
