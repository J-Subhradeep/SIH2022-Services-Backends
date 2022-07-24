import pgeocode
from ...models import User
from ...models import UserAddress
from rest_framework.response import Response
from ...serializers import UserSerializer
from rest_framework.views import APIView
import uuid


def checkPIN(pin, country):
    nomi = pgeocode.Nominatim(country)
    df = nomi.query_postal_code(pin)
    print(df.isnull()["country_code"])
    if df.isnull()["country_code"]:
        return False
    return (True, df.to_dict())


def add_address(user_id, postal_code,  place_name, state_name):
    try:
        UserAddress.objects.create(
            user_id=user_id, postal_code=postal_code, place_name=place_name, state_name=state_name)
    except:
        UserAddress.objects.create(
            user_id=user_id, postal_code="NA", place_name="NA", state_name="NA")


class AddressSetupView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        country_code = data.get('country_code')
        pin_code = data.get('pin_code')
        dob = data.get('dob')
        user_id = data.get('user_id')
        df = checkPIN(pin_code, country_code)
        user = User.objects.filter(user_id=user_id).first()
        if user:
            user.dob = dob
            user.country_code = country_code
            user.pin_code = pin_code
            user.save()
            if df:
                add_address(user_id=user_id, postal_code=df[1].get('postal_code'), place_name=df[1].get(
                    "place_name"), state_name=df[1].get("state_name"))
            return Response({"created": True})
        else:
            return Response({"not_found": True})

        # UserAddress.objects.update_or_create(
        #     user_id=user, postal_code=df[1].get('postal_code'), place_name=df[1].get("place_name"), state_name=df[1].get("state_name"))


class GetAddresses(APIView):
    def post(self, request, *args, **kwargs):
        data = UserAddress.objects.get(pk=request.data.get('user_id'))
        if data:
            return Response({"city": data.place_name+","+data.state_name})
        return Response({"not_found": True})
