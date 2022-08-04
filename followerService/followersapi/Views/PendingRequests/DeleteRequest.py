from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .Serializers import PendingRequestsSerializer
from ...models import PendingRequests


class DeleteRequestView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        req_user_id = request.data.get('user_id', None)
        try:
            req = PendingRequests.objects.filter(
                req_user_id=req_user_id, user_id=user_id).first()
            if req:
                req.delete()
                return Response({"success": True})
            return Response({"success": False}, status.HTTP_404_NOT_FOUND)
        except:
            return Response({"error": True}, status.HTTP_400_BAD_REQUEST)
