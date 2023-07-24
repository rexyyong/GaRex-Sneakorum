from django.urls import path
from . import views

urlpatterns = [
    path('threads/', views.getThreads, name='threads'),
    path('threads/<int:thread_id>', views.getThread, name='thread'),
    path('createThread/', views.createThread, name='createThread'),
    path('createComment/', views.createComment, name='createComment'),
    path('threads/<int:thread_id>/comments', views.getComments, name='comments'),
    path('search/<str:query>', views.searchThread, name='search'),
    path('forum_api/profile/<str:username>/', views.profile, name='profile'),
    path('forum_api/getUser/<str:username>/', views.get_user_by_username, name='getuser'),
]