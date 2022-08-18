"""
ASGI config for NotificationSystem project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
from channels.routing import URLRouter
from MyWebSocket.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'NotificationSystem.settings')


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket': URLRouter(
        websocket_urlpatterns
    )
    # Just HTTP for now. (We can add other protocols later.)
})
