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

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = models.UserProfile(**validated_data)

        user.set_password(password)
        user.save()
        return user