from rest_framework.serializers import ModelSerializer

from .models import User, UserAddress


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "full_name", "email", "dob",
                  "country_code", "pin_code", "gender", "is_varified", ]


class AddressesSerializer(ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"
