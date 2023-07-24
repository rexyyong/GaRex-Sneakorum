from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.n
class Thread(models.Model):
    subject = models.CharField(max_length=128)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    replyCount = models.IntegerField(default=0)

    def __str__(self):
        return f'Thread ID: {self.pk} Subject: {self.subject} '
class Comment(models.Model):
    content = models.TextField()
    thread = models.ForeignKey('Thread', on_delete=models.CASCADE, related_name='thread_comments')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment on {self.thread}'
