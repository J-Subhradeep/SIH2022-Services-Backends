
import uuid
from django.shortcuts import render
from .serializers import UserSerializer
from .models import User, UserAddress
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
import pgeocode


class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        serializers = UserSerializer(data=data)
        if serializers.is_valid():
            user = User.objects.create_user(**data)
            return Response({"success": True})

        return Response(serializers.errors)


def checkPIN(pin, country):
    nomi = pgeocode.Nominatim(country)
    df = nomi.query_postal_code(pin)
    print(df.isnull()["country_code"])
    if df.isnull()["country_code"]:
        return False
    return (True, df.to_dict())


class AddressSetupView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        country_code = data.get('country_code')
        pin_code = data.get('pin_code')
        user_id = data.get('user_id')
        df = checkPIN(pin_code, country_code)
        if df:
            user = User.objects.filter(id=user_id).first()
            print(df[1])
            UserAddress.objects.create(
                user_id=user, postal_code=df[1].get('postal_code'), place_name=df[1].get("place_name"), state_name=df[1].get("state_name"))
            return Response({"valid": True})
        else:
            return Response({"valid": False})


class SendMeOTP(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        user = User.objects.filter(id=user_id).first()
        s = str(uuid.uuid4())[:7]

        return Response({"otp": s})


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(authenticate(email=data.get(
            'email'), password=data.get('password')))
        return Response(data)
