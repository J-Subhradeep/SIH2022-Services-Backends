from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.hashers import check_password


class GetAccess(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.filter(user_id=data.get('user_id')).first()
        if user:
            if user.check_password(data.get('password')):
                return Response({"valid": True})
            else:
                return Response({"valid": False}, status.HTTP_401_UNAUTHORIZED)
        return Response({"valid": False}, status.HTTP_404_NOT_FOUND)
