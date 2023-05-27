const BASE_URL = "http://127.0.0.1:8000/api/music/songs/"

export const getAllSongs = async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
}

export const addSong = async () => {}

export const deleteSong = async () => {}

export const updateSong = async () => {}