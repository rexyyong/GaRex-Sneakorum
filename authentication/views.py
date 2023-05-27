from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages

# Create your views here.
def home(request):
    return render(request, "authentication/index.html")

def signup(request):
    if request.method == "POST":
        fname = request.POST['first_name']
        lname = request.POST['last_name']
        username = request.POST['email']
        password = request.POST['password']
        cpassword = request.POST['confirm_password']

        myuser = User.objects.create_user(username, password, fname)
        #myuser.first_name = fname
        myuser.last_name = lname
        myuser.save()

        messages.success(request, "Your account has been successfully created")
        return redirect('signin')
    return render(request, "authentication/signup.html")

def signin(request):
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(email=email, password=password)

        if user is not None:
            login(request, user)
            fname = user.first_name
            return render(request, "authentication/index.html", {'fname':fname})
        else:
            messages.error(request, "Wrong email or password")
            return redirect('home')

    return render(request, "authentication/signin.html")

def signout(request):
    pass