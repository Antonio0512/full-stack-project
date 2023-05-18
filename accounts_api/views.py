from django.shortcuts import render
from rest_framework import views, status
from rest_framework.response import Response

from . import models
from . import serializers


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
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = models.UserProfile.objects.get(pk=id)
        user.delete()
        return Response(status=status.HTTP_200_OK)
