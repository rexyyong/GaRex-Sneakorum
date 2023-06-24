from django.urls import path
from . import views

urlpatterns = [
    path('threads/', views.getThreads, name='threads'),
    path('threads/<int:thread_id>', views.getThread, name='thread'),
    path('createThread/', views.createThread, name='createThread'),
    path('createComment/', views.createComment, name='createComment'),
    path('threads/<int:thread_id>/comments', views.getComments, name='comments'),
]