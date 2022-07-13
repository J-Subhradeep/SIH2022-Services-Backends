from django.db import models
from django.contrib.postgres.indexes import BTreeIndex
# Create your models here.


class Followers(models.Model):
    user_id = models.CharField(max_length=10)
    following_id = models.CharField(max_length=10)

    class Meta:
        indexes = [BTreeIndex(
            fields=("user_id", "following_id", "id"), fillfactor=30)]
