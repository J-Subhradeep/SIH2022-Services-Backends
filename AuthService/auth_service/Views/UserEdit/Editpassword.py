
from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate


class UserPasswordEditView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        old_password = data.get('old_password')
        new_password = data.get('new_password')
        user_id = data.get('user_id')
        user = User.objects.filter(user_id=user_id).first()
        if user:
            if authenticate(request, email=user.email, password=old_password):
                user.set_password(new_password)
                user.save()
                return Response({"success": True})
        return Response({"success": False})
