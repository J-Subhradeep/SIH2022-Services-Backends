from ...models import Followers
from rest_framework.serializers import ModelSerializer


class PendingRequestsSerializer(ModelSerializer):
    class Meta:
        model = Followers
        fields = ["user_id", "following_id"]
