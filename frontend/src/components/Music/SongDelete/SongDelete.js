import "./song-delete.css";
import React, {useContext} from "react";
import {MusicContext} from "../../../contexts/MusicContext";
import {Link, useParams} from "react-router-dom";


export const SongDelete = () => {
    const {songs, deleteSong} = useContext(MusicContext);
    const {songId} = useParams();
    const song = songs.find((s) => s.id === Number(songId));

    const onDeleteHandler = async (e) => {
        e.preventDefault();

        await deleteSong(songId);
    };

    return (
        <div className="song-delete-container">
            <h2>Delete Song</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={song?.title || ""}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={song?.artist || ""}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={song?.duration || ""}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={song?.genre || ""}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="song_image_url">Image URL:</label>
                    <input
                        type="text"
                        id="song_image_url"
                        name="song_image_url"
                        value={song?.song_image_url || ""}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Is Favourite:</label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="isFavourite"
                            checked={song?.is_favourite || false}
                            disabled
                        />
                    </div>
                </div>
                <div className="buttons-container">
                    <button type={"submit"} onClick={onDeleteHandler}>Delete</button>
                    <Link to="/song-catalog" className="button-cancel">Cancel</Link>
                </div>
            </form>
        </div>
    );
};
