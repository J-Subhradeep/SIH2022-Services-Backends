import pgeocode
from ...models import User
from ...models import UserAddress
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
import uuid
import requests
from rest_framework import status


class SendMeOTP(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        user = User.objects.filter(user_id=user_id).first()

        s = str(uuid.uuid4())[:7]
        if user:
            try:
                print(user.email)
                email = user.email
                requests.post("http://localhost:8087/send_otp/",  {
                    "email": f"{email}",
                    "subject": "daakticket Email Verification",
                    "otp": f"{s}"
                })
                print(user, s)
                user.otp_var = s
                user.save()
            except:
                return Response({"otp_send": False}, status.HTTP_400_BAD_REQUEST)
        return Response({"otp_send": True})


class EmailOTPVerification(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        otp_get = data.get('otp_get')
        user = User.objects.filter(user_id=user_id).first()
        if user and (otp_get == user.otp_var):
            user.is_varified = True
            user.save()
            return Response({"verified": True, "user_id": user.user_id})
        else:
            return Response({"verified": False}, status.HTTP_401_UNAUTHORIZED)
