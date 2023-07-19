from django.shortcuts import render
from .models import Thread, Comment
from .serializers import ThreadSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
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
    try:
        thread = Thread.objects.get(pk=thread_id)
    except thread.DoesNotExist:
        content = {"The Thread does not exist."}
        return JsonResponse(content)
    serializer = ThreadSerializer(thread, many=False)

    return Response(serializer.data)

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


@api_view(['POST'])
def createComment(request):
    # Parse the JSON data from the request body
    content = request.data.get('content')
    threadID = request.data.get('thread')

    # Update reply count of the associated thread
    thread = Thread.objects.get(pk=threadID)
    thread.replyCount += 1
    thread.save()

    # Create a new comment object
    new_comment = Comment(
        content=content,
        thread=thread
    )
    new_comment.save()

    serializer = CommentSerializer(new_comment, many=False)
    return Response(serializer.data)



@api_view(['GET'])
def getComments(request, thread_id):
    # set pagination
    paginator = PageNumberPagination()
    paginator.page_size = 10

    # get the thread
    thread = Thread.objects.get(pk=thread_id)

    # get all post belong to the given thread
    comments = thread.thread_comments.order_by('created').all()
    result_page = paginator.paginate_queryset(comments, request)
    serializer = CommentSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def searchThread(request, query):
    filtered_threads = Thread.objects.filter(subject__icontains=query)
    serializer = ThreadSerializer(filtered_threads, many=True)
    serialized_threads = serializer.data
    print(serialized_threads)
    # Return the JSON response with the serialized threads
    return JsonResponse({'threads': serialized_threads})

