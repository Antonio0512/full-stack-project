import json

from django.contrib.auth import authenticate
from rest_framework import views, status

from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from . import models
from . import serializers
from .permissions import IsOwnerOrReadOnly


class ProfilesApiView(views.APIView):
    def get(self, request):
        profile = models.UserProfile.objects.all()
        serializer = serializers.ProfilesSerializer(profile, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = serializers.ProfilesSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)

            response_data = {
                'access_token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            }

            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfilesDetailsApiView(views.APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, req, id):
        user = models.UserProfile.objects.get(pk=id)
        serializer = serializers.ProfilesSerializer(user)
        return Response({'user': serializer.data})

    def post(self, request, id):
        user = models.UserProfile.objects.get(pk=id)
        serializer = serializers.ProfilesSerializer(user, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        user = models.UserProfile.objects.get(pk=id)
        serializer = serializers.ProfilesSerializer(user, data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            if password:
                user.set_password(password)
                user.save()
            serializer.save()
            return Response(json.loads(json.dumps(serializer.data)), status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = models.UserProfile.objects.get(pk=id)
        user.delete()
        return Response(status=status.HTTP_200_OK)


class LoginAPIView(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)

        if user is None or not user.is_active:
            return Response({'detail': "Invalid email or password."},
                            status=status.HTTP_401_UNAUTHORIZED)

        token, _ = Token.objects.get_or_create(user=user)

        response_data = {
            'access_token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        }

        return Response(json.loads(json.dumps(response_data)))
