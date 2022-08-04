from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView


class GetUserByName(APIView):
    def get(self, request, *args, **kwargs):
        user_name = kwargs.get("user_name")
        if user_name:
            user = User.objects.filter(full_name__icontains=user_name)
            if user:
                serializer = UserSerializer(user, many=True)
                return Response(serializer.data)
            return Response({'not_found': True})
        return Response({'not_found': True})
