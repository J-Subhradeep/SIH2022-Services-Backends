import pgeocode
from ...models import User
from ...models import UserAddress
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
import uuid
import requests


class SendMeOTP(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        user = User.objects.filter(id=user_id).first()

        s = str(uuid.uuid4())[:7]
        if user:
            try:
                print(user.email)
                email = user.email
                requests.post("http://localhost:5000/send_otp/",  {
                    "email": f"{email}",
                    "subject": "daakticket Email Verification",
                    "otp": f"{s}"
                })
                print(user, s)
                user.otp_var = s
                user.save()
            except:
                return Response({"otp_send": False})
        return Response({"otp_send": True})
