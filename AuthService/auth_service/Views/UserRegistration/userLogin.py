from django.contrib.auth import authenticate
from rest_framework.views import APIView
from ...serializers import UserSerializer
from rest_framework.response import Response

class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user = authenticate(request,email=data.get(
            'email'), password=data.get('password'))
        if user:
            serializer = UserSerializer(user, partial=True)
            data = serializer.data
            return Response(data)
        return Response({'not_found': True})
