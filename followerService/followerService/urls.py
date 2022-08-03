"""followerService URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from followersapi import views
from followersapi.Views import GetSuggestions
from followersapi.Views.PendingRequests import GetPendingRequests, SendRequests
urlpatterns = [
    path('admin/', admin.site.urls),
    path('getsuggestions/<user_id>/', GetSuggestions.GetSuggestionsView.as_view()),
    path("getpendingrequests/<user_id>/",
         GetPendingRequests.GetPendingRequestsView.as_view()),
    path("sendrequest/<user_id>/", SendRequests.SendRequestView.as_view()),
    # path('sendrequest/', views.SendFollowRequest.as_view()),
    # path('getfollowrequests/', views.GetPendingRequests.as_view()),
    # path('makefollow/', views.MakeFollow.as_view()),
    # path('getfollowers/', views.GetFollowers.as_view()),
    # path('sentrequestsbyme/', views.SentRequestsByMe.as_view()),
    # path('cancelrequest/', views.CancelRequest.as_view()),
    # path("closerequest/", views.CloseRequest.as_view()),
]
