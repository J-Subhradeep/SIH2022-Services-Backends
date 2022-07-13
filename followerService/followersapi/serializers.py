from rest_framework.serializers import ModelSerializer

from .models import Followers
class FollowersSerializer(ModelSerializer):
    class Meta:
        model = Followers
        fields = "__all__"