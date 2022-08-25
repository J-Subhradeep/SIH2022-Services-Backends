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


class IsPending(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id', None)
        req_user = request.data.get('following_id', None)
        is_pending = PendingRequests.objects.filter(
            user_id=user_id, req_user_id=req_user)
        print(user_id, req_user)
        print(is_pending)
        if is_pending:
            return Response({"is_pending": True})
        return Response({"is_pending": False})
