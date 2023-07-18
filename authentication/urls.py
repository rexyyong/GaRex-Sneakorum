from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('signup', views.signup, name="signup"),
    path('signin', views.signin, name="signin"),
    path('logout', views.logout_view, name="logout"),
    path('home', views.home, name="home"),
    path('forum', views.react_app, name='forum'),
    path('get-session-user', views.session, name='session'),
    path('test', views.test, name='test'),
    path('get-csrf-token/', views.get_csrf_token, name='get_csrf_token'),
]