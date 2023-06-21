from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.n
class Thread(models.Model):
    subject = models.CharField(max_length=128)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Thread ID: {self.pk} Subject: {self.subject} '
