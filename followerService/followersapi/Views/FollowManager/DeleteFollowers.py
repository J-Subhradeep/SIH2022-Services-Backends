from rest_framework.views import APIView
from rest_framework.response import Response
from .Serializers import PendingRequestsSerializer
from ...models import Followers
from rest_framework import status


class DeleteFollowersView(APIView):
    def post(self, request, *args, **kwargs):
        following_id = kwargs.get('user_id')
        user_id = request.data.get('user_id')
        followers = Followers.objects.filter(
            user_id=user_id, following_id=following_id).first()
        if followers:
            followers.delete()
            return Response({"success": True})
        return Response({"success": False}, status.HTTP_404_NOT_FOUND)
