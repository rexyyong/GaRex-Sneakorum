from django.shortcuts import render
from .models import Thread
from .serializers import ThreadSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
import json
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def getThreads(request):
    # set pagination
    paginator = PageNumberPagination()
    paginator.page_size = 15
    threads = Thread.objects.all().order_by('-created')
    result_page = paginator.paginate_queryset(threads, request)
    serializer = ThreadSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def getThread(request, thread_id):
    pass
    # try:
    #     thread = Thread.objects.get(pk=thread_id)
    # except thread.DoesNotExist:
    #     content = {"The Thread does not exist."}
    #     return Response(content)
    #
    # thread = Thread.objects.get(pk=thread_id)
    # serializer = ThreadSerializer(thread, many=False)
    #
    # return Response(serializer.data)

@api_view(['POST'])
def createThread(request):
    data = request.data
    subject = data['subject']
    content = data['content']
    new_thread = Thread.objects.create(
        subject=subject,
        content=content
    )
    serializer = ThreadSerializer(new_thread)
    return Response(serializer.data)