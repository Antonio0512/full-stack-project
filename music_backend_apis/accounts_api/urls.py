from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProfilesApiView.as_view(), name='profiles'),
    path('<int:id>', views.ProfilesDetailsApiView.as_view(), name='profile-details'),
    path('login/', views.LoginAPIView.as_view(), name='login')
]