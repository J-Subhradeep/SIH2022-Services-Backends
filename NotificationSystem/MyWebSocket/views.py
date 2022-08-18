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
        res = requests.patch("http://localhost:8089/push", data={
            'user': data.get("to"),
            'notif': [*data.get("messages")],
        })
        res = requests.get(
            "http://localhost:8089/get/unseen?user="+data.get("to"))
        async_to_sync(channels_layer.group_send)(data.get("to"), {
            'type': 'chat.message', 'msg': res.json()})
        return Response(res.json())


class DeleteUnseenCount(views.APIView):
    def post(self, request, *args, **kwargs):
        channels_layer = get_channel_layer()
        data = request.data
        user_id = data.get('user_id')
        if user_id:
            res = requests.patch("http://localhost:8089/nil", {
                "user": user_id
            })
            async_to_sync(channels_layer.group_send)(user_id, {
                'type': 'chat.message', 'msg': res.json()})
            return Response(res.json())
        else:
            return Response({}, status.HTTP_404_NOT_FOUND)
