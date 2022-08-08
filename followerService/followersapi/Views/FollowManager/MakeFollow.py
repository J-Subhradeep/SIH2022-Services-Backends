from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ...models import Followers, PendingRequests


class MakeFollowView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id', None)
        following_id = request.data.get('user_id')
        follow = Followers.objects.create(
            user_id=user_id, following_id=following_id)
        pending = PendingRequests.objects.filter(
            req_user_id=following_id, user_id=user_id).first()
        pending.delete()
        return Response({"success": True})
