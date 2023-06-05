from rest_framework import serializers

from .models import Song, Like, Dislike


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class DislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dislike
        fields = '__all__'


class SongSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    dislikes_count = serializers.SerializerMethodField()

    def get_likes_count(self, song):
        return Like.objects.filter(song=song).count()

    def get_dislikes_count(self, song):
        return Dislike.objects.filter(song=song).count()

    class Meta:
        model = Song
        fields = ('id', 'title', 'artist', 'duration', 'genre', 'likes_count', 'dislikes_count',
                  'is_favourite', 'song_image_url', 'album', 'creator_id')
        read_only_fields = ('id',)
