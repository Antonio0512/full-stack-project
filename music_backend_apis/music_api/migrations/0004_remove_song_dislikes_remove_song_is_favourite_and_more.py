# Generated by Django 4.2.1 on 2023-06-05 16:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('music_api', '0003_song_creator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='dislikes',
        ),
        migrations.RemoveField(
            model_name='song',
            name='is_favourite',
        ),
        migrations.RemoveField(
            model_name='song',
            name='likes',
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music_api.song')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'song')},
            },
        ),
        migrations.CreateModel(
            name='Dislike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music_api.song')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'song')},
            },
        ),
    ]
