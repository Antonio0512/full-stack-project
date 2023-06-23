import "./song-details.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faThumbsDown, faThumbsUp, faTrash} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect, useState} from "react";
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

    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const currSong = await getOneSong(songId);
                setSong(currSong);
                const likesAndDislikes = await commonService.getLikes(songId);
                setLikesDislike(likesAndDislikes);
            } catch (error) {
                console.log("Error in getting the song's details", error);
            }
        };
        fetchSongDetails();
    }, [songId]);


    const handleLike = async () => {
        const likesData = await commonService.postLikes(songId);
        setLikesDislike(likesData);
    };

    const handleDislike = async () => {
        const dislikesData = await commonService.postDislikes(songId);
        setLikesDislike(dislikesData)
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

    return (<div
        className="song-details-container"
        style={{backgroundImage: `url(${song.song_image_url})`}}
    >
        <div className="song-box">
            <div className="song-header">
                {isOwner && (<div className="song-actions">
                    <button onClick={handleEditSong}>
                        <FontAwesomeIcon icon={faEdit}/>
                    </button>
                    <button onClick={handleDeleteSong}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button>
                </div>)}
            </div>
            <div className="song-details">
                <div className="song-content">
                    <h2 className="song-title">{song.title}</h2>
                    <p>Artist: {song.artist}</p>
                    <p>Duration: {song.duration} minutes</p>
                    <p>Genre: {song.genre}</p>
                    <p>
                        {song.is_favourite ? (<span>Is Favourite: Yes</span>) : (<span>Is Favourite: No</span>)}
                    </p>
                    {likesDislikes && (<React.Fragment>
                        <p>Likes: {likesDislikes.total_likes}</p>
                        <p>Dislikes: {likesDislikes.total_dislikes}</p>
                    </React.Fragment>)}
                </div>
                <div className="song-actions">
                    <div className="post-comment">
            <textarea
                // value={comment}
                // onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
            />
                        <button>Post Comment</button>
                    </div>
                    <div className="like-dislike">
                        <button onClick={handleLike}>
                            <FontAwesomeIcon icon={faThumbsUp}
                                             color={likesDislikes?.is_liked ? 'blue' : 'white'}/>
                        </button>
                        <button onClick={handleDislike}>
                            <FontAwesomeIcon icon={faThumbsDown}
                                             color={likesDislikes?.is_disliked ? 'red' : 'white  '}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};
