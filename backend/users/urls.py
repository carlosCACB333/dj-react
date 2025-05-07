from users.views import RegisterView, LoginView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from django.urls import path


urlpatterns = [
    path("sign-in/", LoginView.as_view(), name="login"),
    path("sign-up", RegisterView.as_view(), name="register"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
