from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('accounts/', include('accounts_api.urls')),
        # path('music/', include('music_api.urls'))
    ]))
]
