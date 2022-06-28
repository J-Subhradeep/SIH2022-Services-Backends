from rest_framework.serializers import ModelSerializer

from Authentication_Service.auth_service.models import User
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"