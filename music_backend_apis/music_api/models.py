from django.db import models


class Album(models.Model):
    title = models.CharField(max_length=225)
    artist = models.CharField(max_length=225)
    release_date = models.DateField()
    cover_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Song(models.Model):
    title = models.CharField(max_length=225)
    artist = models.CharField(max_length=225)
    duration = models.FloatField(default=0)
    genre = models.CharField(max_length=225)
    song_image_url = models.URLField(blank=True, null=True)
    likes = models.PositiveIntegerField(default=0)
    dislikes = models.PositiveIntegerField(default=0)
    is_favourite = models.BooleanField(default=False)
    album = models.ForeignKey(Album,
                              on_delete=models.CASCADE,
                              related_name="songs",
                              null=True,
                              blank=True,
                              default=None)