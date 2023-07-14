from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from rest_framework.decorators import api_view

# Create your views here.
def index(request):
    return render(request, "authentication/index.html")

def home(request):
    return render(request, "authentication/home.html")

@api_view(['POST'])
def signup(request):
    data = request.data
    username = data['username']
    password = data['pass1']
    pass2 = data['pass2']
    email = data['email']
    fname = data['fname']
    lname = data['lname']

    if password != pass2:
        messages.error(request, "passwords dont match")
        return JsonResponse({'message': 'Signup unsuccessful'}, status=300)

    myuser = User.objects.create_user(username, email, password)
    myuser.first_name = fname
    myuser.last_name = lname
    myuser.save()

    return JsonResponse({'message': 'Signup successful'}, status=200)


@api_view(['POST'])
def signin(request):
    data = request.data
    username = data['username']
    password = data['password']
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        # fname = user.first_name
        return JsonResponse({'message': 'Login successful'}, status=200)
    else:
        return JsonResponse({'message': 'Login unsuccessful'}, status=300)

def signout(request):
    logout(request)
    messages.success(request, "Logged out Successfully")
    return render(request, "authentication/index.html")


def react_app(request):
    return render(request, "index.html")