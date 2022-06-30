
from django.shortcuts import render
from .serializers import UserSerializer
from .models import User
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
    return (True, df)


class SecondStepRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        country_code = data.get('country_code')
        pin_code = data.get('pin_code')
        otp_var = data.get('otp_var')
        user_id = data.get('user_id')
        if checkPIN(pin_code, country_code):
            pass


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        print(authenticate(email=data.get(
            'email'), password=data.get('password')))
        return Response(data)
