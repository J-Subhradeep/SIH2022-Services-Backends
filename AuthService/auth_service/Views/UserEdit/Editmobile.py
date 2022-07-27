
from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework import status


class UserMobileEditView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        new_mobile = data.get('new_mobile')
        user_id = data.get('user_id')
        user = User.objects.filter(user_id=user_id).first()
        if user:
            # if authenticate(request, email=user.email, password=old_password):
            user.mobile = new_mobile
            user.save()
            return Response({"success": True})
        return Response({"success": False}, status.HTTP_401_UNAUTHORIZED)
