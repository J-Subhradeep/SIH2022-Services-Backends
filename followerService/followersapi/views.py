from django.shortcuts import render
import pandas
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Followers
# Create your views here.


class Get_SuggestionsView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        print(user_id)
        data = requests.get('http://localhost:8000/getalluser/').json()
        df = pandas.DataFrame(data)
        df = df[df['is_varified'] == True]
        df = df[df['user_id'] != user_id]
        print(df.to_dict(orient="index").values())
        return Response(df.to_dict(orient="index").values())


class MakeFollow(APIView):
    def post(self, request, *args, **kwargs):
        data = request.date
        id = data.get('user_id')
        to = data.get('req_to')
        try:
            Followers.objects.create(user_id=id, following_id=to)
            return Response({"success": True})
        except:
            return Response({"success": False})
