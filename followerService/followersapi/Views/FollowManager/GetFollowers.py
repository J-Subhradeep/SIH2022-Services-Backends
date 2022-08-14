from rest_framework.views import APIView
from rest_framework.response import Response
from .Serializers import PendingRequestsSerializer
from ...models import Followers


class GetFollowers(APIView):
    def get(self, request, *args, **kwargs):
        following_id = kwargs.get('user_id')
        followers = Followers.objects.filter(user_id=following_id)
        serializer = PendingRequestsSerializer(followers, many=True)
        return Response(serializer.data)
