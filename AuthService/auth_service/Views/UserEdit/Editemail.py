
from ...models import User
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate

import re

# Make a regular expression
# for validating an Email
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'


def check(email):

    if(re.fullmatch(regex, email)):
        return True

    else:
        return False


class UserEmailEditView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        old_password = data.get('old_password')
        new_email = data.get('new_email')
        user_id = data.get('user_id')
        if not check(new_email):
            return Response({"valid_mail": False})
        user = User.objects.filter(user_id=user_id).first()
        if user:
            if authenticate(request, email=user.email, password=old_password):

                user.email = new_email
                user.save()
                return Response({"success": True})
        return Response({"success": False})
