from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('accounts/', include('music_backend_apis.accounts_api.urls')),
        path('music/', include('music_backend_apis.music_api.urls'))
    ]))
]
