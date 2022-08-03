from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .Serializers import PendingRequestsSerializer
from ...models import PendingRequests


class GetPendingRequestsView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        req_users = PendingRequests.objects.filter(user_id=user_id)
        serializer = PendingRequestsSerializer(req_users, many=True)
        return Response(serializer.data)
