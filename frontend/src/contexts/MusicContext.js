import {createContext, useState, useEffect} from "react";
import * as musicService from "../services/musicService";
import {useNavigate} from "react-router-dom";

export const MusicContext = createContext();

export const MusicProvider = ({children}) => {
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        musicService.getAllSongs().then((result) => {
            setSongs(result);
        });
    }, []);

    const addSong = async (songData) => {
        try {
            const response = await musicService.addSong(songData);
            setSongs((prevSongs) => [...prevSongs, response]);
            navigate('/song-catalog')
        } catch (err) {
            throw new Error(err);
        }
    };

    const deleteSong = async (songId) => {
        try {
            await musicService.deleteSong(songId);
            setSongs((prevSongs) => prevSongs.filter((song) => song.id !== Number(songId)));
            navigate('/song-catalog');
        } catch (err) {
            throw new Error(err);
        }
    };

    const editSong = async (songId, songData) => {
        try {
            const response = await musicService.editSong(songId, songData);
            setSongs((prevSongs) =>
                prevSongs.map((song) => (song.id === Number(songId) ? response : song))
            );
            navigate(`/song-catalog/song-details/${Number(songId)}`);
        } catch (err) {
            throw new Error(err)
        }
    };

    const musicContextData = {
        songs,
        addSong,
        deleteSong,
        editSong,
        setSongs
    };
    return (
        <MusicContext.Provider value={musicContextData}>
            {children}
        </MusicContext.Provider>
    );
};
