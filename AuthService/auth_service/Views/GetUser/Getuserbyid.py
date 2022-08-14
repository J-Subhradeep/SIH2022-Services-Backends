from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status


class GetUser(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id:
            user = User.objects.filter(user_id=user_id).first()
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data)
            return Response({'not_found': True}, status.HTTP_404_NOT_FOUND)
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
