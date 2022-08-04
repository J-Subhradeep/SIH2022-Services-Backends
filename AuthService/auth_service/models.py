from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.postgres.indexes import BTreeIndex, HashIndex
import uuid
# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, full_name, email, mobile, password, **other):
        user = self.model(full_name=full_name, email=self.normalize_email(
            email), mobile=mobile, **other)
        user.set_password(password)
        user.save()
        return user

    def edit_user(self, id, full_name, email, password, mobile, gender, dob, pin_code, country_code, otp_var, created_at, user_id):
        user = self.model.objects.get(pk=id)
        user.delete()

        user = self.model(full_name=full_name,
                          email=self.normalize_email(email), mobile=mobile, gender=gender, dob=dob, pin_code=pin_code, country_code=country_code, otp_var=otp_var, created_at=created_at, user_id=user_id)
        user.set_password(password)
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(
        max_length=100, db_index=True, default=str(uuid.uuid4())[:7])
    full_name = models.CharField(max_length=100,  db_index=True)
    email = models.EmailField(max_length=100, unique=True, db_index=True)
    mobile = models.CharField(max_length=30, db_index=True)
    dob = models.CharField(max_length=30)
    pin_code = models.CharField(max_length=10, db_index=True)
    country_code = models.CharField(max_length=10, db_index=True)
    gender = models.CharField(max_length=10)
    otp_var = models.CharField(max_length=10, default="")
    is_varified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_online = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'mobile',
                       'gender']
    objects = UserManager()

    def __str__(self):
        return self.email

    def tokens(self):
        return ""

    class Meta:
        indexes = [BTreeIndex(
            fields=("full_name", "pin_code", "id", "user_id"), fillfactor=40)]


class UserAddress(models.Model):
    user_id = models.CharField(max_length=100, primary_key=True)
    place_name = models.CharField(max_length=600, db_index=True)
    state_name = models.CharField(max_length=100, db_index=True)
    postal_code = models.CharField(max_length=100, db_index=True)

    class Meta:
        indexes = [BTreeIndex(
            fields=("user_id", "state_name", "postal_code"), fillfactor=30)]
