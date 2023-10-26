from django.db import models

# Create your models here.


class TodoModel(models.Model):
  id = models.IntegerField(primary_key=True)
  user_id = models.IntegerField(null=True)
  status = models.BooleanField(null=False)
  title = models.CharField(max_length=64,null=False)
  content = models.CharField(max_length=300)
  due_date = models.DateTimeField(null=False)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)



