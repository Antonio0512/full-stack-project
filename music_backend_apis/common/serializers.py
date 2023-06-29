from rest_framework import serializers
from .models import Like, Dislike, Comment


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class DislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dislike
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
