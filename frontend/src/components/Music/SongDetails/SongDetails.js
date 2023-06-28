import "./song-details.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faThumbsDown, faThumbsUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
import {useForm} from "../../../hooks/useForm";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../contexts/AuthContext";
import {getOneSong} from "../../../services/musicService";
import * as commonService from "../../../services/likesCommentService";

export const SongDetails = () => {
    const {userId} = useContext(AuthContext);
    const {songId} = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState(null);
    const [likesDislikes, setLikesDislike] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const currSong = await getOneSong(songId);
                setSong(currSong);
                const likesAndDislikes = await commonService.getLikesAndDislikes(songId);
                setLikesDislike(likesAndDislikes);
                const commentsData = await commonService.getComments(songId);
                setComments(commentsData);
            } catch (error) {
                console.log("Error in getting the song's details", error);
            }
        };
        fetchSongDetails();
    }, [songId]);

    const {onSubmit, onChangeHandler, values} = useForm(() => postComment(values),
        {commentText: ''});

    const postComment = async () => {
        try {
            const newComment = {
                "text": values.commentText,
                "comment_to_song": songId,
                "user_that_commented": userId
            };
            const updatedComment = await commonService.postComment(newComment, songId);
            setComments(comments => [...comments, updatedComment]);
            values.commentText = ""
        } catch (error) {
            console.log("Error posting comment", error);
        }
    };

    const handleLike = async () => {
        const likesData = await commonService.postLikes(songId);
        setLikesDislike(likesData);
    };

    const handleDislike = async () => {
        const dislikesData = await commonService.postDislikes(songId);
        setLikesDislike(dislikesData);
    };

    const handleEditSong = () => {
        navigate(`/song-catalog/song-edit/${Number(songId)}`);
    };

    const handleDeleteSong = () => {
        navigate(`/song-catalog/song-delete/${Number(songId)}`);
    };

    if (!song) {
        return <div>Loading...</div>;
    }

    const isOwner = song.creator_id === userId;

    return (
        <div className="song-details-container" style={{backgroundImage: `url(${song?.song_image_url})`}}>
            <div className="song-box">
                <div className="song-header">
                    {isOwner && (
                        <div className="song-actions">
                            <button onClick={handleEditSong}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button onClick={handleDeleteSong}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </div>
                    )}
                </div>
                <div className="song-details">
                    <div className="song-content">
                        {song && (
                            <>
                                <h2 className="song-title">{song.title}</h2>
                                <p>Artist: {song.artist}</p>
                                <p>Duration: {song.duration} minutes</p>
                                <p>Genre: {song.genre}</p>
                                <p>
                                    {song.is_favourite ? (
                                        <span>Is Favourite: Yes</span>
                                    ) : (
                                        <span>Is Favourite: No</span>
                                    )}
                                </p>
                                {likesDislikes && (
                                    <>
                                        <p>Likes: {likesDislikes.total_likes}</p>
                                        <p>Dislikes: {likesDislikes.total_dislikes}</p>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="song-actions">
                        <div className="post-comment">
                        <textarea
                            value={values.commentText}
                            onChange={onChangeHandler}
                            name="commentText"
                            placeholder="Add a comment..."
                        />
                            <button onClick={onSubmit}>Post Comment</button>
                        </div>
                        <div className="like-dislike">
                            <button onClick={handleLike}>
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    color={likesDislikes?.is_liked ? 'blue' : 'white'}
                                />
                            </button>
                            <button onClick={handleDislike}>
                                <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    color={likesDislikes?.is_disliked ? 'red' : 'white'}
                                />
                            </button>
                        </div>
                    </div>
                    <div className="comments-section">
                        <h3>Comments:</h3>
                        <div className="comments-container">
                            {comments.map((comment) => (
                                <div className="comment" key={comment.id}>
                                    <p className="comment-user">User: {comment.user_that_commented}</p>
                                    <p>{comment.text}</p>
                                    <p className="comment-date">Date: {comment.date_time_of_publication}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}