from django.urls import path

from . import views

urlpatterns = [
    path('songs/', views.SongListApiView.as_view(), name='songs')
]