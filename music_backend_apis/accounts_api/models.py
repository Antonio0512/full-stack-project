from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from . import managers, validators


class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, blank=False, null=False, max_length=50,
                              validators=[validators.validate_email])

    username = models.CharField(unique=True, max_length=50, blank=False, null=False,
                                validators=[validators.validate_username])

    first_name = models.CharField(max_length=30, blank=True, null=True,
                                  validators=[validators.validate_name_characters])

    last_name = models.CharField(max_length=30, blank=True, null=True,
                                 validators=[validators.validate_name_characters])

    age = models.PositiveIntegerField(null=False, blank=False,
                                      default=12, validators=[validators.validate_age_range])

    bio = models.TextField(null=True, blank=True, validators=[validators.validate_bio_length])

    profile_picture = models.URLField(blank=True, null=True, validators=[validators.validate_url])

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    objects = managers.UserManager()

    def __str__(self):
        return self.email
