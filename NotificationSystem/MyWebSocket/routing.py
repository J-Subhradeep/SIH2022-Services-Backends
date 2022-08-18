from django.urls import path
from . import consumers
websocket_urlpatterns = [
    path("ws/get_notification/<str:grp_name>/",
         consumers.ChatConsumer.as_asgi())
]
