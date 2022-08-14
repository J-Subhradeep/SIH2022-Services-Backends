from django.contrib.auth import authenticate
from rest_framework.views import APIView
from ...serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user = authenticate(request, email=data.get(
            'email'), password=data.get('password'))

        if user:
            if not user.is_varified:
                return Response({"user_id": user.user_id}, status.HTTP_403_FORBIDDEN)
            serializer = UserSerializer(user, partial=True)
            data = serializer.data
            return Response(data)
        return Response({'not_found': True}, status.HTTP_401_UNAUTHORIZED)
