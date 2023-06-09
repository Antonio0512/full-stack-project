from rest_framework import views, status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from . import models
from . import serializers
from .permissions import IsOwnerOrReadOnly


class SongListApiView(views.APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        songs = models.Song.objects.all()
        serializer = serializers.SongSerializer(songs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.SongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SongDetailsApiView(views.APIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_song(self, id):
        try:
            return models.Song.objects.get(pk=id)
        except models.Song.DoesNotExist:
            return None

    def get(self, request, id):
        song = self.get_song(id)
        if song:
            serializer = serializers.SongSerializer(song)
            response_data = serializer.data

            # Add likes and dislikes count to the response data
            response_data['likes_count'] = song.likes.count()
            response_data['dislikes_count'] = song.dislikes.count()

            return Response(response_data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        song = self.get_song(id)
        if song:
            serializer = serializers.SongSerializer(song, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        song = self.get_song(id)
        if song:
            song.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)
