
from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate


class UserNameEditView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        old_password = data.get('old_password')
        new_name = data.get('new_name')
        user_id = data.get('user_id')
        user = User.objects.filter(user_id=user_id).first()
        if user:
            if authenticate(request, email=user.email, password=old_password):
                user.full_name = new_name
                user.save()
                return Response({"success": True})
        return Response({"success": False})
