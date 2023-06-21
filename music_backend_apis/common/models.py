from django.db import models

from music_backend_apis.accounts_api.models import UserProfile
from music_backend_apis.music_api.models import Song


class Comment(models.Model):
    text = models.TextField(
        max_length=300
    )
    date_time_of_publication = models.DateTimeField(
        auto_now_add=True
    )
    comment_to_song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE
    )
    user_that_commented = models.ForeignKey(
        UserProfile,
        on_delete=models.RESTRICT
    )


class Like(models.Model):
    like_to_song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name='likes'
    )
    user_that_liked = models.ForeignKey(
        UserProfile,
        on_delete=models.RESTRICT,
        related_name='likes'
    )


class Dislike(models.Model):
    dislike_to_song = models.ForeignKey(
        Song,
        on_delete=models.CASCADE,
        related_name='dislikes'
    )
    user_that_disliked = models.ForeignKey(
        UserProfile,
        on_delete=models.RESTRICT,
        related_name='dislikes'
    )
