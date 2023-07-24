from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Thread, Comment
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')
class ThreadSerializer(ModelSerializer):
    class Meta:
        model = Thread
        fields = ("id",
                  "subject",
                  "content",
                  "created",
                  "user",
                  "replyCount")

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id",
                    "created",
                    "content",
                    "thread",)

