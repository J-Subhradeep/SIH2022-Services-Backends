from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.postgres.indexes import BTreeIndex,HashIndex

# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, full_name, email, password,dob,pin_code,country_code,gender):
        if full_name is None:
            raise TypeError('Users should have a full_name')
        if email is None:
            raise TypeError('Users should have an Email')
        if password is None:
            raise TypeError('Users should have a Password')
        user = self.model(full_name=full_name, email=self.normalize_email(email),dob=dob,pin_code=pin_code,country_code=country_code,gender=gender)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password):
        if password is None:
            raise TypeError('Users should have a username')

        user = self.create_user(
            username=username, email=self.normalize_email(email), password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=100, unique=True, db_index=True)
    email = models.EmailField(max_length=100, unique=True, db_index=True)
    mobile = models.CharField(max_length=30,db_index=True)
    dob = models.CharField(max_length=30)
    pin_code = models.CharField(max_length=10,db_index=True)
    country_code = models.CharField(max_length=10,db_index=True)
    gender = models.CharField(max_length=10)
    otp_var = models.CharField(max_length=10,default="")
    is_varified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_online = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name','mobile','pin_code']
    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        return ""
    class Meta:
        indexes = [BTreeIndex(fields=("full_name","pin_code","id"),fillfactor=40)]