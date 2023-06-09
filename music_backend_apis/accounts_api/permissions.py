from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow safe methods (GET, HEAD, OPTIONS) for all users
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return True

        # Check if the authenticated user is the owner of the profile
        return obj.user == request.user
