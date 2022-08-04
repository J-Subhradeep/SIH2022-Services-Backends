from django.db import models
from django.contrib.postgres.indexes import BTreeIndex
# Create your models here.


class Followers(models.Model):
    user_id = models.CharField(max_length=10)
    following_id = models.CharField(max_length=10)

    class Meta:
        indexes = [BTreeIndex(
            fields=("user_id", "following_id", "id"), fillfactor=80)]


class PendingRequests(models.Model):
    user_id = models.CharField(max_length=10)  # to whom the request was sent
    req_user_id = models.CharField(max_length=10)  # who sent the request

    class Meta:
        indexes = [BTreeIndex(
            fields=("user_id", "req_user_id", "id"), fillfactor=50)]
