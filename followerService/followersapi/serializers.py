from rest_framework.serializers import ModelSerializer

from .models import Followers, PendingRequests


class FollowersSerializer(ModelSerializer):
    class Meta:
        model = Followers
        fields = ["user_id"]


class PendingRequestsSerializer(ModelSerializer):
    class Meta:
        model = PendingRequests
        fields = ["user_id"]
