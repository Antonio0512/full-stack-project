import "./song-details.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash, faThumbsUp, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MusicContext} from "../../../contexts/MusicContext";
import {AuthContext} from "../../../contexts/AuthContext";
import {getOneSong} from "../../../services/musicService";
import {getLikesCount} from "../../../services/likesCommentService";
import {likeSong, unlikeSong} from "../../../services/likesCommentService";

export const SongDetails = () => {
    const {userId} = useContext(AuthContext);
    const {editSong} = useContext(MusicContext);
    const {songId} = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState(null);
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState()

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const songData = await getOneSong(songId);
                setSong(songData);
                const likesData = await getLikesCount(songId);
                setLikesCount(likesData)
            } catch (error) {
                console.log('Failed to fetch song details:', error);
            }
        };

        fetchSongDetails();
    }, [songId]);

    const handleLike = async () => {
        try {
            await likeSong(songId);
            setIsLiked(true);
            setLikesCount((prevLikes) => prevLikes + 1);
        } catch (error) {
            console.log('Failed to update song like status:', error);
        }
    };

    const handleUnlike = async () => {
        try {
            await unlikeSong(songId);
            setIsLiked(false);
            setLikesCount((prevLikes) => prevLikes - 1);
        } catch (error) {
            console.log('Failed to update song like status:', error);
        }
    };

    const handleDislike = () => {
        const updatedSong = {...song, dislikes: song.dislikes + 1};
        editSong(songId, updatedSong);
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
        <div
            className="song-details-container"
            style={{backgroundImage: `url(${song.song_image_url})`}}
        >
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
                        <p>Likes: {likesCount}</p>
                        <p>Dislikes: {song.dislikes_count}</p>
                    </div>
                    <div className="song-actions">
                        <div className="post-comment">
              <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
              />
                            <button>Post Comment</button>
                        </div>
                        <div className="like-dislike">
                            {isLiked ? (
                                <button onClick={handleUnlike}>
                                    <FontAwesomeIcon icon={faThumbsUp}/>
                                </button>
                            ) : (
                                <button onClick={handleLike}>
                                    <FontAwesomeIcon icon={faThumbsUp}/>
                                </button>
                            )}
                            <button onClick={handleDislike}>
                                <FontAwesomeIcon icon={faThumbsDown}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
