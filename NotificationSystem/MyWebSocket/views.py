from django.shortcuts import render
from rest_framework import views
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import requests
from rest_framework.response import Response
from rest_framework import status
import json
# Create your views here.

# http://localhost:8089/get/total
# http://localhost:8089/get/unseen
# http://localhost:8089/get/notifs


class SendNotificationView(views.APIView):
    def post(self, request, *args, **kwargs):
        data = request.data
        channels_layer = get_channel_layer()
        if not data.get("to") and not data.get("messages"):
            return Response({}, status.HTTP_406_NOT_ACCEPTABLE)
        print(data.get("to"), data.get("messages"))
        res = requests.patch("http://localhost:8089/push", data={
            'user': data.get("to"),
            'notif': [*data.get("messages")],
        })
        print(json.dumps({
            'user': data.get("to"),
            'notif': data.get("messages"),
        }))
        print(res.text)
        res = requests.get(
            "http://localhost:8089/get/unseen?user="+data.get("to"))
        print("Hello, world!", res.content)
        return Response(res)
