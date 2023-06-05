import "./song-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MusicContext } from "../../../contexts/MusicContext";
import { AuthContext } from "../../../contexts/AuthContext";

export const SongDetails = () => {
  const { userId } = useContext(AuthContext);
  const { songs, editSong } = useContext(MusicContext);
  const { songId } = useParams();

  const navigate = useNavigate();
  // Find the song based on the songId
  const song = songs.find((s) => s.id === Number(songId));

  const [comment, setComment] = useState("");

  const handleLike = () => {
    const updatedSong = { ...song, likes: song.likes + 1 };
    editSong(songId, updatedSong);
  };

  const handleDislike = () => {
    const updatedSong = { ...song, dislikes: song.dislikes + 1 };
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
      style={{ backgroundImage: `url(${song.song_image_url})` }}
    >
      <div className="song-box">
        <div className="song-header">
          {isOwner && (
            <div className="song-actions">
              <button onClick={handleEditSong}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={handleDeleteSong}>
                <FontAwesomeIcon icon={faTrash} />
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
            <p>Likes: {song.likes}</p>
            <p>Dislikes: {song.dislikes}</p>
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
              <button onClick={handleLike}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button onClick={handleDislike}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
