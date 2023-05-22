from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response

from . import models
from . import serializers


class SongListApiView(views.APIView):
    def get(self, request):
        songs = models.Song.objects.all()
        serializer = serializers.SongSerializer(songs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)