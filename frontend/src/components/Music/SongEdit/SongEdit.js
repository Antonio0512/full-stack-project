import React, {useContext} from "react";
import {useForm} from "../../../hooks/useForm";
import {MusicContext} from "../../../contexts/MusicContext";
import "./song-edit.css";
import {Link, useParams} from "react-router-dom";

const SongEditKeys = {
    Title: "title",
    Artist: "artist",
    Duration: "duration",
    Genre: "genre",
    Is_favourite: "is_favourite",
    Song_image_url: "song_image_url",
};
export const SongEdit = () => {
    const {editSong, songs} = useContext(MusicContext);
    const {songId} = useParams();
    const song = songs.find((s) => s.id === Number(songId));
    const {values, onChangeHandler, onSubmit} = useForm(
        () => editSong(songId, values),
        {
            [SongEditKeys.Title]: song.title,
            [SongEditKeys.Artist]: song.artist,
            [SongEditKeys.Duration]: song.duration,
            [SongEditKeys.Genre]: song.genre,
            [SongEditKeys.Is_favourite]: song.is_favourite,
            [SongEditKeys.Song_image_url]: song.song_image_url,
        }
    );

    return (
        <div className="song-edit-container">
            <h2>Edit Song</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values[SongEditKeys.Title]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={values[SongEditKeys.Artist]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={values[SongEditKeys.Duration]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values[SongEditKeys.Genre]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="song_image_url">Image URL:</label>
                    <input
                        type="text"
                        id="song_image_url"
                        name="song_image_url"
                        value={values[SongEditKeys.Song_image_url]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Is Favourite:</label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="isFavourite"
                            checked={values[SongEditKeys.Is_favourite]}
                            onChange={(e) =>
                                onChangeHandler({
                                    target: {
                                        name: `${SongEditKeys.Is_favourite}`,
                                        value: e.target.checked,
                                    },
                                })
                            }
                        />
                    </div>
                </div>
                <div className="buttons-container">
                    <button type="submit">Edit</button>
                    <Link to="/song-catalog" className="button-cancel">Cancel</Link>
                </div>
            </form>
        </div>
    );
}