
import json
import uuid
from django.shortcuts import render
import requests
from .serializers import UserSerializer
from .models import User, UserAddress
# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
import pgeocode
from django.core.mail import send_mail
from django.conf import settings
from .task import send_mail_celery


class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        serializers = UserSerializer(data=data, partial=True)
        if serializers.is_valid():
            try:
                user = User.objects.create_user(**data)
            except Exception as e:
                return Response({"error": str(e)})
            return Response({"success": True, "email": user.email, "id": user.id})

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
        dob = data.get('dob')
        user_id = data.get('user_id')
        df = checkPIN(pin_code, country_code)
        if df:
            try:
                user = User.objects.filter(id=user_id).first()
                user.dob = dob
                user.country_code = country_code
                user.pin_code = pin_code
                user.save()
            except:
                return Response({"user": "Not Exist User"})
            print(df[1])
            if not UserAddress.objects.filter(pk=user):

                UserAddress.objects.update_or_create(
                    user_id=user, postal_code=df[1].get('postal_code'), place_name=df[1].get("place_name"), state_name=df[1].get("state_name"))
            else:
                u = UserAddress(user_id_id=user_id, postal_code=df[1].get(
                    'postal_code'), place_name=df[1].get("place_name"), state_name=df[1].get("state_name"))
                u.save()
            return Response({"valid": True})
        else:
            return Response({"valid": False})


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
                requests.post("http://localhost:5000/sendEmail/", {
                    "email": f"{email}",
                    "message": json.dumps({
                        "heading": f"Hello Mr./Mrs. {user.full_name}",
                        "body": f"Your OTP for DaakTicket Verification is {s}. Dont Share it with any one. Enter this OTP in the OTP field to activate your account",
                        "subject": "DaakTicket Email Verification OTP"
                    })
                })
                # send_mail("GleeGo Email Verification OTP",
                #           f"Your OTP for GleeGo Verification is {s}. Dont Share it with any one. Enter this OTP in the OTP field to activate your account", "GleeGo <anipal0@outlook.com>", [email],)
                # send_mail_celery.delay(user.full_name, email, s)
                print(user, s)
                user.otp_var = s
                user.save()
                # print(user.otp_var)
            except:
                return Response({"otp_send": False})
        return Response({"otp_send": True})


class EmailVerification(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        otp_get = data.get('otp_get')
        user = User.objects.filter(id=user_id).first()
        if user and (otp_get == user.otp_var):
            user.is_varified = True
            user.save()
            return Response({"verified": True})
        else:
            return Response({"verified": False})


class UserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user = authenticate(email=data.get(
            'email'), password=data.get('password'))

        if user:

            # if user.is_varified:

            serializer = UserSerializer(user, partial=True)

            data = serializer.data
            # del data['password']
            # del data["otp_var"]
            return Response(data)
        return Response({'not_found': True})


class GetUser(APIView):
    def get(self, request, *args, **kwargs):
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        if data.get('id'):
            user = User.objects.filter(pk=data.get('id'))
        if data.get('pin_code'):
            user = User.objects.filter(pin_code=data.get('pin_code'))
        if data.get('name'):
            user = User.objects.filter(
                full_name__icontains=data.get('name'))
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


class UserEdit(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        user_id = data.get('id')
        if not user_id:
            return Response({"invalid": True})
        user = User.objects.get(pk=user_id)
        user2 = authenticate(email=user.email, password=data.get('password'))
        if not user2:
            return Response({"invalid_password": True})
        full_name = data.get('name') if data.get(
            'name') else user.full_name
        email = data.get('email') if data.get('email') else user.email
        mobile = data.get('mobile') if data.get('mobile') else user.mobile
        pin_code = data.get('pin_code') if data.get(
            'pin_code') else user.pin_code
        country_code = data.get('country_code') if data.get(
            'country_code') else user.country_code
        dob = data.get('dob') if data.get('dob') else user.dob
        user.delete()
        user = User.objects.create_user(
            full_name=full_name, email=email, mobile=mobile, password=data.get('password'), pin_code=pin_code, country_code=country_code, dob=dob)
        print(full_name, email, mobile, data.get('password'))
        return Response({"success": True, "email": user.email, "id": user.id})
        # if len(User.objects.filter(email=data.get('email'))) > 0:
        #     return Response({"invalid_email": True})
        # try:
        #     user2 = User.objects.edit_user(id=user.id,
        #                                    full_name=full_name, email=email, password=user.password, mobile=mobile, gender=user.gender, dob=user.dob, pin_code=user.pin_code, country_code=user.country_code, otp_var=user.otp_var, created_at=user.created_at)

        # serializer = UserSerializer(user2)
        #     return Response({"success": True, "email": user2.email, "id": user2.id})
        # except Exception as e:
        #     print(e)
        #     return Response({"success": False})


class PasswordChange(APIView):
    pass
