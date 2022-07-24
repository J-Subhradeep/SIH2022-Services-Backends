"""Authentication_Service URL Configuration

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
from auth_service import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from auth_service.Views.GetUser import Getuserbyid, Getuserbyname
from auth_service.Views.UserRegistration import userRegistration, addressSetupView, userLogin
urlpatterns = [
    path('admin/', admin.site.urls),
    # path('register/', views.UserRegistrationView.as_view(), name="Registration"),
    # path('gettoken/', TokenObtainPairView.as_view(), name="gettoken"),
    # path('verifytoken/', TokenVerifyView.as_view(), name="verifytoken"),
    # path('refreshtoken/', TokenRefreshView.as_view(), name="refreshtoken"),
    # path('addressset/', views.AddressSetupView.as_view(), name="addressset"),
    # path('sendotp/', views.SendMeOTP.as_view(), name="sendotp"),
    # path('emailverify/', views.EmailVerification.as_view(), name="emailverify"),
    # path("login/", views.UserLoginView.as_view(), name="login"),
    # path("getalluser/", views.GetUser.as_view()),
    # path('useredit/', views.UserEdit.as_view()),
    # path("getaddress/", views.GetAddresses.as_view()),
    # path("changepassword/", views.PasswordChange.as_view()),
    # scalling ---

    # get user
    path("getuserbyid/<user_id>/", Getuserbyid.GetUser.as_view()),
    path("getuserbyid/", Getuserbyid.GetUser.as_view()),
    path("getuserbyname/<user_name>/", Getuserbyname.GetUserByName.as_view()),
    # register user
    path("register/", userRegistration.UserRegistrationView.as_view()),

    # required parameters country_code, pin_code, dob, user_id
    path("addressgenerate/", addressSetupView.AddressSetupView.as_view()),

    # login
    path("login/", userLogin.UserLoginView.as_view()),
]
