from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Album(models.Model):
    title = models.CharField(max_length=225)
    artist = models.CharField(max_length=225)
    release_date = models.DateField()
    cover_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Song(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    title = models.CharField(max_length=225)
    artist = models.CharField(max_length=225)
    duration = models.FloatField(default=0)
    genre = models.CharField(max_length=225)
    is_favourite = models.BooleanField(default=False)
    song_image_url = models.URLField(blank=True, null=True)
    album = models.ForeignKey(
        Album,
        on_delete=models.CASCADE,
        related_name="songs",
        null=True,
        blank=True,
        default=None
    )

    def __str__(self):
        return self.title


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "song"]


class Dislike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["user", "song"]


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.song.title}"