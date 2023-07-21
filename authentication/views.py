from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})
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
        request.session['username'] = username
        request.session.modified = True
        request.session.save()
        # print(request.session['username'])
        # fname = user.first_name
        if request.session.session_key and request.user.is_authenticated:
            for key in request.session.keys():
                print(key)
            return JsonResponse({'message': 'Login successful'}, status=200)
    else:
        return JsonResponse({'message': 'Login unsuccessful'}, status=300)

@api_view(['POST'])
def logout_view(request: Request) -> Response:
    logout(request)
    # request.session.flush()
    return JsonResponse({'message': 'Logout successful'}, status=200)

# @login_required
def session(request):
    print('test')
    print(request.session.session_key)
    if request.user.is_authenticated:
        print('test2')
        username = request.session['username']
        print(username)
        return JsonResponse({'username': username})
    else:
        return JsonResponse({'message': 'Unsuccessful'},status=401)
@api_view(['GET'])
def test(request):
    # print('testing...')
    # print(request.session.session_key)
    # print(vars(request.user))
    if request.session.session_key:
    #     print(request.session.session_key)
        return JsonResponse({'sessionData': request.session.session_key})
    else:
        print("failure")
        return JsonResponse({'sessionData': 'nil'})
def react_app(request):
    return render(request, "index.html")