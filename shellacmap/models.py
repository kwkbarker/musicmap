from django.db import models
from django.db.models.fields import CharField, DecimalField

# Create your models here.

class Marker(models.Model):
    lat = DecimalField(decimal_places=4, max_digits=12)
    lng = DecimalField(decimal_places=4, max_digits=12)
    audio = CharField(max_length=360)
    audiolabel = CharField(max_length=360, default="")
    text = CharField(max_length=40048)
    textref = CharField(max_length=360, default="")
    heading = CharField(max_length=240)
    map = CharField(max_length=128)

