# Generated by Django 4.2.1 on 2023-06-21 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('music_api', '0007_alter_dislike_unique_together_remove_dislike_song_and_more'),
        ('common', '0002_alter_dislike_dislike_to_photo_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dislike',
            old_name='dislike_to_photo',
            new_name='dislike_to_song',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='like_to_photo',
            new_name='like_to_song',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='comment_to_photo',
        ),
        migrations.AddField(
            model_name='comment',
            name='comment_to_song',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='music_api.song'),
            preserve_default=False,
        ),
    ]
