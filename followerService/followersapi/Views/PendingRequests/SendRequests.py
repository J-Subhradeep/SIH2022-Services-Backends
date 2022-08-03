from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .Serializers import PendingRequestsSerializer
from ...models import PendingRequests


class SendRequestView(APIView):
    def post(self, request, *args, **kwargs):
        req_user_id = kwargs.get('user_id', None)
        user_id = request.data.get('user_id')
        try:
            user = PendingRequests.objects.create(
                user_id=user_id, req_user_id=req_user_id)
            return Response({"user_id": user.user_id, "req_user_id": user.req_user_id})
        except:
            return Response({"error": True}, status.HTTP_400_BAD_REQUEST)
