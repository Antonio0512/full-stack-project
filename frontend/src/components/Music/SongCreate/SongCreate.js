import "./song-create.css"
import React, {useContext} from "react";
import {useForm} from "../../../hooks/useForm"
import {MusicContext} from "../../../contexts/MusicContext";

const SongAddKeys = {
    Title: "title",
    Artist: "artist",
    Duration: "duration",
    Genre: "genre",
    IsFavourite: "isFavourite",
}

export const SongCreate = () => {
    const {addSong} = useContext(MusicContext)

    const {values, onChangeHandler, onSubmit} = useForm(() => addSong(values), {
        [SongAddKeys.Title]: "",
        [SongAddKeys.Artist]: "",
        [SongAddKeys.Duration]: "",
        [SongAddKeys.Genre]: "",
        [SongAddKeys.IsFavourite]: false
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
                    <label>
                        <input
                            type="checkbox"
                            name="isFavourite"
                            checked={values[SongAddKeys.IsFavourite]}
                            onChange={(e) =>
                                onChangeHandler({
                                    target: {name: 'isFavourite', value: e.target.checked}
                                })
                            }
                        />
                        Is Favourite
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    );
};
