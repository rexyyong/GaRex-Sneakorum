from django.urls import path
from . import views

urlpatterns = [
    path('threads/', views.getThreads, name='threads'),
    path('threads/<int:thread_id>', views.getThreads, name='thread'),
    path('createThread/', views.createThread, name='createThread'),
]