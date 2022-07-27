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
from auth_service.Views.UserRegistration import userRegistration, addressSetupView, userLogin, Otpmanager
from auth_service.Views.UserEdit import Editpassword, Editemail, Editusername, GetEditAccess, Editmobile
urlpatterns = [
    path('admin/', admin.site.urls),
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
    # email and password
    path("login/", userLogin.UserLoginView.as_view()),
    # change password
    # required parameters user_id, old password, new password
    path("changepassword/", Editpassword.UserPasswordEditView.as_view()),
    # change email
    path("changeemail/", Editemail.UserEmailEditView.as_view()),
    # change name
    path("changeusername/", Editusername.UserNameEditView.as_view()),
    # change mobile
    path("changemobile/", Editmobile.UserMobileEditView.as_view()),
    # check password for a user
    path("getaccess/", GetEditAccess.GetAccess.as_view()),

    # send otp
    path("sendotp/", Otpmanager.SendMeOTP.as_view()),   # verify otp
    path("verifyotp/", Otpmanager.EmailOTPVerification.as_view()),

]
