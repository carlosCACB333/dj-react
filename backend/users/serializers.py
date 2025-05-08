from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenVerifySerializer as BaseTokenVerifySerializer,
)
from users.models import User, Role
from rest_framework import serializers
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password"]


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = [
            "email",
            "password",
            "confirm_password",
            "first_name",
            "last_name",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "password": "The two password fields didn't match.",
                    "confirm_password": "The two password fields didn't match.",
                }
            )
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=Role.ADMIN,
        )
        return user


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data


class TokenVerifySerializer(BaseTokenVerifySerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        try:

            token = UntypedToken(attrs["token"])
            user_id = token.get("user_id")

            user = User.objects.get(id=user_id)
            data["user"] = UserSerializer(user).data

        except (TokenError, User.DoesNotExist) as e:
            raise InvalidToken("Token inválido o usuario no encontrado")

        return data
