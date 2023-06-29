# Generated by Django 4.2.1 on 2023-06-23 17:42

from django.db import migrations, models
import music_backend_apis.accounts_api.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_api', '0004_alter_userprofile_age_alter_userprofile_bio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='last_name',
            field=models.CharField(blank=True, max_length=30, null=True, validators=[music_backend_apis.accounts_api.validators.validate_name_characters]),
        ),
    ]