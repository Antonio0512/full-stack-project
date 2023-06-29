from django.urls import path
from . import views

urlpatterns = [
    path('songs/<int:song_id>/like/', views.LikeSongAPIView.as_view(), name='like'),
    path('songs/<int:song_id>/dislike/', views.DislikeSongAPIView.as_view(), name='dislike'),
    path('songs/<int:song_id>/comments/', views.CommentAPIView.as_view(), name='song-comments'),
]
