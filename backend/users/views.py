from users.models import User
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from users.serializers import LoginSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
