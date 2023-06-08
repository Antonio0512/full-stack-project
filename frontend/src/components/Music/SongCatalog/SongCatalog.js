import {useContext, useEffect, useState} from "react";
import {MusicContext} from "../../../contexts/MusicContext";
import "./song-catalog.css";
import {useNavigate} from "react-router-dom";

export const SongCatalog = () => {
    const {songs} = useContext(MusicContext);
    const [catalog, setCatalog] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCatalog((prevCatalog) => {
            if (showFavorites) {
                return songs.filter((song) => song.is_favourite);
            } else {
                return songs;
            }
        });
    }, [songs, showFavorites]);

    const handleShowFavorites = () => {
        setShowFavorites(true);
    };

    const handleShowAllSongs = () => {
        setShowFavorites(false);
    };

    const openSongDetailsPage = (songId) => {
        navigate(`/song-catalog/song-details/${songId}`);
    };

    return (
        <div className="song-catalog">
            <h1>Song Catalog</h1>
            <div className="song-links">
                <button className={showFavorites ? "active" : ""} onClick={handleShowFavorites}>
                    Favorites
                </button>
                <button className={!showFavorites ? "active" : ""} onClick={handleShowAllSongs}>
                    All Songs
                </button>
            </div>
            {songs &&
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
                                <p>{song.is_favourite ? <span>Is Favourite: Yes</span> :
                                    <span>Is Favourite: No</span>}</p>
                            </div>
                            <div className="song-buttons">
                                <button className="details-button" onClick={() => openSongDetailsPage(song.id)}>Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};
