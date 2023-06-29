# Generated by Django 4.2.1 on 2023-06-23 17:59

from django.db import migrations, models
import music_backend_apis.accounts_api.validators


class Migration(migrations.Migration):

    dependencies = [
        ('accounts_api', '0005_alter_userprofile_last_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='username',
            field=models.CharField(max_length=50, unique=True, validators=[music_backend_apis.accounts_api.validators.validate_username]),
        ),
    ]