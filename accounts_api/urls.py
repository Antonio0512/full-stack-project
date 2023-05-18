from django.urls import path

from . import views

urlpatterns = [
    path('', views.ProfilesApiView.as_view(), name='accounts'),
    path('<int:id>', views.ProfilesDetailsApiView.as_view(), name='account-details')
]