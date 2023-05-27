import { createContext, useState, useEffect } from "react";
import * as musicService from "../services/musicService";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    musicService.getAllSongs().then((result) => {
        setSongs(result);
    })
  }, []);

  const addSong = async (songData) => {
    try {
      const response = await musicService.addSong(songData);
      setSongs((prevSongs) => [...prevSongs, response]);
    } catch (err) {
      console.error("Error adding song:", err);
    }
  };

  const deleteSong = async (songId) => {
    try {
      await musicService.deleteSong(songId);
      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
    } catch (err) {
      console.error("Error deleting song:", err);
    }
  };

  const updateSong = async (songId, songData) => {
    try {
      const response = await musicService.updateSong(songId, songData);
      setSongs((prevSongs) =>
        prevSongs.map((song) => (song.id === songId ? response : song))
      );
    } catch (err) {
      console.error("Error updating song:", err);
    }
  };

  const musicContextData = {
    songs,
    addSong,
    deleteSong,
    updateSong,
  };

  return (
    <MusicContext.Provider value={musicContextData}>
      {children}
    </MusicContext.Provider>
  );
};
