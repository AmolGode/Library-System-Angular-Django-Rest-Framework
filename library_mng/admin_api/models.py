from django.db import models

# Create your models here.

class Admin(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    email_id = models.CharField(max_length=30,unique=True)
    password = models.CharField(max_length=200,blank=False,null=False)
