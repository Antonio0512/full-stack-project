from django.urls import path

from . import views

urlpatterns = [
    path('songs/', views.SongListApiView.as_view(), name='songs'),
    path('songs/<int:id>', views.SongDetailsApiView.as_view(), name='song-details')
]