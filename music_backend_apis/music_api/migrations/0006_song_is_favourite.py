# Generated by Django 4.2.1 on 2023-06-05 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music_api', '0005_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='is_favourite',
            field=models.BooleanField(default=False),
        ),
    ]
