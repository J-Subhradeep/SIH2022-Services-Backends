from ...models import PendingRequests
from rest_framework.serializers import ModelSerializer


class PendingRequestsSerializer(ModelSerializer):
    class Meta:
        model = PendingRequests
        fields = ["req_user_id"]
