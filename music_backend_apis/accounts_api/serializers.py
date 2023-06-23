from rest_framework import serializers

from . import models
from .validators import validate_password_strength


class ProfilesSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password_strength])

    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password', 'age', 'bio', 'profile_picture')
        read_only_fields = ('id',)

    def save(self, **kwargs):
        password = self.validated_data.get('password', None)
        user = super().save(**kwargs)

        if password:
            user.set_password(password)
            user.save()

        return user
