from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Thread

class ThreadSerializer(ModelSerializer):
    class Meta:
        model = Thread
        fields = (
                    "subject",
                    "content",
                    "created")