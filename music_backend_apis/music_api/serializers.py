from rest_framework import serializers

from . import models


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Song
        fields = ('id', 'title', 'artist',
                  'duration', 'genre', 'likes',
                  'dislikes', 'is_favourite', 'song_image_url',
                  'album', 'creator_id')
        read_only_fields = ('id',)
