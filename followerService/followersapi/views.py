from django.shortcuts import render
import pandas
import requests
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import FollowersSerializer, PendingRequestsSerializer
from .models import Followers, PendingRequests
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
        data = request.data
        id = data.get('user_id')  # who sent the following request
        to = data.get('req_get')  # to whom the request was sent
        pending_req_obj = PendingRequests.objects.filter(
            user_id=id, req_user_id=to).first()
        if pending_req_obj:
            Followers.objects.create(user_id=id, following_id=to)
            pending_req_obj.delete()
            return Response({"success": True})
        return Response({"success": False})


class SendFollowRequest(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        id = data.get('user_id')  # who send the request
        to = data.get('req_to')  # to whom the request was sent
        try:
            PendingRequests.objects.create(user_id=id, req_user_id=to)
            return Response({"success": True})
        except:
            return Response({"success": False})


class GetFollowers(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        followers = Followers.objects.filter(following_id=user_id)
        serializer = FollowersSerializer(followers, many=True)
        return Response(serializer.data)


class GetPendingRequests(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        requests = PendingRequests.objects.filter(req_user_id=user_id)
        serializer = PendingRequestsSerializer(requests, many=True)
        return Response(serializer.data)
