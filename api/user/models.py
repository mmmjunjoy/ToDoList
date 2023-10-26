from django.db import models

# Create your models here.


class UserSignup(models.Model):
  id = models.IntegerField(primary_key=True)
  user_name = models.CharField(max_length=50)
  password = models.CharField(max_length=100)
  created_at = models.DateTimeField(auto_now_add=True)

