import "./song-create.css"
import React, {useContext} from "react";
import {useForm} from "../../../hooks/useForm"
import {MusicContext} from "../../../contexts/MusicContext";

const SongAddKeys = {
    Title: "title",
    Artist: "artist",
    Duration: "duration",
    Genre: "genre",
    Is_favourite: "is_favourite",
    Song_image_url: "song_image_url"
}

export const SongCreate = () => {
    const {addSong} = useContext(MusicContext)

    const {values, onChangeHandler, onSubmit} = useForm(() => addSong(values), {
        [SongAddKeys.Title]: "",
        [SongAddKeys.Artist]: "",
        [SongAddKeys.Duration]: "",
        [SongAddKeys.Genre]: "",
        [SongAddKeys.Is_favourite]: false,
        [SongAddKeys.Song_image_url]: ""
    });

    return (
        <div className="main-container">
            <h2>Add a New Song</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values[SongAddKeys.Title]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={values[SongAddKeys.Artist]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={values[SongAddKeys.Duration]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={values[SongAddKeys.Genre]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="song_image_url">Image url:</label>
                    <input
                        type="text"
                        id="song_image_url"
                        name="song_image_url"
                        value={values[SongAddKeys.Song_image_url]}
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Is Favourite:</label>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            name="isFavourite"
                            checked={values[SongAddKeys.Is_favourite]}
                            onChange={(e) =>
                                onChangeHandler({
                                    target: {name: `${SongAddKeys.Is_favourite}`, value: e.target.checked}
                                })
                            }
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
};
