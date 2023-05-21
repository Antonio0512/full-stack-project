from rest_framework import serializers

from . import models


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password')
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self, **kwargs):
        password = self.validated_data.get('password', None)
        user = super().save(**kwargs)

        if password:
            user.set_password(password)
            user.save()

        return user
