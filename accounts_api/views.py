from django.contrib.auth import authenticate

from rest_framework import views, status

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

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
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = models.UserProfile.objects.get(pk=id)
        user.delete()
        return Response(status=status.HTTP_200_OK)


class LoginAPIView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user is None or not user.is_active:
            return Response({'detail': "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'access_token': str(refresh.access_token)
        })
