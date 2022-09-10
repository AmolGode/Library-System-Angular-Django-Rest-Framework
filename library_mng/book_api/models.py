from django.db import models

# Create your models here.

class Book(models.Model):
    book_name = models.CharField(max_length=50)
    author_name = models.CharField(max_length=50)
    publish_year = models.IntegerField()
    book_price = models.IntegerField()
    