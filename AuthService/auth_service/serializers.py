from rest_framework.serializers import ModelSerializer

from .models import User, UserAddress


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class AddressesSerializer(ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"
