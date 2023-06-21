from rest_framework import serializers

from .models import Song


class SongSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    dislikes_count = serializers.SerializerMethodField()

    class Meta:
        model = Song
        fields = ('id', 'title', 'artist', 'duration', 'genre', 'likes_count', 'dislikes_count',
                  'is_favourite', 'song_image_url', 'album', 'creator_id')
        read_only_fields = ('id',)

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_dislikes_count(self, obj):
        return obj.dislikes.count()
