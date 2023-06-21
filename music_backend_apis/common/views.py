from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Like
# from .permissions import IsOwnerOrReadOnly


# from .serializers import DislikeSerializer

# from ..music_api.models import Song
# from ..music_api.serializers import SongSerializer


class LikeSongAPIView(views.APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, song_id):
        try:
            likes = Like.objects.filter(like_to_song_id=song_id)
            all_likes = likes.count()
            response_data = {
                "all_likes": all_likes,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Like.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, song_id):
        user_id = request.user.id

        try:
            like = Like.objects.get(user_that_liked=user_id, like_to_song_id=song_id)
            like.delete()
        except Like.DoesNotExist:
            like = Like(user_that_liked=request.user, like_to_song_id=song_id)
            like.save()

        total_likes = Like.objects.filter(like_to_song_id=song_id).count()
        response_data = {
            "total_likes": total_likes,
            "user_id": user_id,
            "song_id": song_id
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

# class DislikeSongAPIView(views.APIView):
#     def post(self, request, song_id):
#         user = request.user.id
#         try:
#             dislike = Dislike.objects.get(user_that_disliked=user, dislike_to_song_id=song_id)
#             dislike.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Dislike.DoesNotExist:
#             dislike = Dislike(user_that_disliked=user, dislike_to_song_id=song_id)
#             dislike.save()
#             serializer = DislikeSerializer(dislike)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
