from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.n
class Thread(models.Model):
    subject = models.CharField(max_length=128)
    content = models.TextField()

    def __str__(self):
        return f'Thread {self.subject} '
