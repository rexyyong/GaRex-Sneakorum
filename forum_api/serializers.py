from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Thread, Comment


class ThreadSerializer(ModelSerializer):
    class Meta:
        model = Thread
        fields = ("id",
                  "subject",
                  "content",
                  "created")

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id",
                    "created",
                    "content",
                    "thread",)

