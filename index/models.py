from django.db import models

class Available(models.Model):
    name = models.CharField(max_length=100, unique=True)
    group = models.CharField(max_length=100)
    link = models.CharField(max_length=100, blank=True)
    access = models.BooleanField(default=True)

    def __str__(self):
        return self.name
