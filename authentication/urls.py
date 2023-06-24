from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('signout', views.signin, name="signout"),
    path('home', views.home, name="home"),
    path('forum', views.react_app, name='forum'),
]