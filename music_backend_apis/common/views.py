from rest_framework import views, status, pagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Like, Dislike, Comment
from .serializers import CommentSerializer
from ..music_api.models import Song


class BaseLikeDislikeAPIView(views.APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    IS_LIKED = False
    IS_DISLIKED = False

    def get_like_dislike_status(self, user_id, song_id):
        try:
            Like.objects.get(user_that_liked=user_id, like_to_song_id=song_id)
            self.IS_LIKED = True
        except Like.DoesNotExist:
            self.IS_LIKED = False

        try:
            Dislike.objects.get(user_that_disliked=user_id, dislike_to_song_id=song_id)
            self.IS_DISLIKED = True
        except Dislike.DoesNotExist:
            self.IS_DISLIKED = False

    def _get_response_data(self, total_likes, total_dislikes, user_id, song_id, is_liked, is_disliked):
        return {
            "total_likes": total_likes,
            "total_dislikes": total_dislikes,
            "user_id": user_id,
            "song_id": song_id,
            "is_liked": is_liked,
            "is_disliked": is_disliked
        }


class LikeSongAPIView(BaseLikeDislikeAPIView):
    def get(self, request, song_id):
        user_id = request.user.id
        self.get_like_dislike_status(user_id, song_id)

        total_likes = Like.objects.filter(like_to_song_id=song_id).count()
        total_dislikes = Dislike.objects.filter(dislike_to_song_id=song_id).count()

        response_data = self._get_response_data(total_likes, total_dislikes, user_id, song_id, self.IS_LIKED,
                                                self.IS_DISLIKED)

        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, song_id):
        user_id = request.user.id

        try:
            like = Like.objects.get(user_that_liked=user_id, like_to_song_id=song_id)
            like.delete()
            self.IS_LIKED = False

        except Like.DoesNotExist:
            like = Like(user_that_liked=request.user, like_to_song_id=song_id)
            like.save()
            self.IS_LIKED = True

            try:
                dislike = Dislike.objects.get(user_that_disliked=user_id, dislike_to_song_id=song_id)
                dislike.delete()
                self.IS_DISLIKED = False
            except Dislike.DoesNotExist:
                pass

        total_likes = Like.objects.filter(like_to_song_id=song_id).count()
        total_dislikes = Dislike.objects.filter(dislike_to_song_id=song_id).count()

        response_data = self._get_response_data(total_likes, total_dislikes, user_id, song_id, self.IS_LIKED,
                                                self.IS_DISLIKED)

        return Response(response_data, status=status.HTTP_201_CREATED)


class DislikeSongAPIView(BaseLikeDislikeAPIView):
    def get(self, request, song_id):
        user_id = request.user.id
        self.get_like_dislike_status(user_id, song_id)

        total_likes = Like.objects.filter(like_to_song_id=song_id).count()
        total_dislikes = Dislike.objects.filter(dislike_to_song_id=song_id).count()

        response_data = self._get_response_data(total_likes, total_dislikes, user_id, song_id, self.IS_LIKED,
                                                self.IS_DISLIKED)

        return Response(response_data, status=status.HTTP_200_OK)

    def post(self, request, song_id):
        user_id = request.user.id

        try:
            dislike = Dislike.objects.get(user_that_disliked=user_id, dislike_to_song_id=song_id)
            dislike.delete()
            self.IS_DISLIKED = False

        except Dislike.DoesNotExist:
            dislike = Dislike(user_that_disliked=request.user, dislike_to_song_id=song_id)
            dislike.save()
            self.IS_DISLIKED = True
            try:
                like = Like.objects.get(user_that_liked=user_id, like_to_song_id=song_id)
                like.delete()
                self.IS_LIKED = False
            except Like.DoesNotExist:
                pass

        total_likes = Like.objects.filter(like_to_song_id=song_id).count()
        total_dislikes = Dislike.objects.filter(dislike_to_song_id=song_id).count()

        response_data = self._get_response_data(total_likes, total_dislikes, user_id, song_id, self.IS_LIKED,
                                                self.IS_DISLIKED)

        return Response(response_data, status=status.HTTP_201_CREATED)


class CustomPagination(pagination.PageNumberPagination):
    page_size = 10


class CommentAPIView(views.APIView):
    def get(self, request, song_id):
        try:
            comments = Comment.objects.filter(comment_to_song_id=song_id)
        except Comment.DoesNotExist:
            return Response({"error": "Comments not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, song_id):
        try:
            song = Song.objects.get(id=song_id)
        except Song.DoesNotExist:
            return Response({"error": "Song not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_that_commented=request.user, comment_to_song=song)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
