import React, {useContext, useEffect, useState} from "react";
import {MusicContext} from "../../../contexts/MusicContext";
import "./song-catalog.css";

export const SongCatalog = () => {
    const {songs} = useContext(MusicContext);
    const [catalog, setCatalog] = useState([]);

    useEffect(() => {
        setCatalog(songs);
    }, [songs]);

    return (
        <div className="song-catalog">
            <h1>Song Catalog</h1>
            <div className="song-card-container">
                {catalog.map((song) => (
                    <div key={song.id} className="song-card">
                        <div className="song-image-container">
                            <img src={song.song_image_url} alt={song.title} className="song-image"/>
                        </div>
                        <div className="song-details">
                            <h3>{song.title}</h3>
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
                        </div>
                        <div className="song-buttons">
                            <button className="edit-button">Edit</button>
                            <button className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
