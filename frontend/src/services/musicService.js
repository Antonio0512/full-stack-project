import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/music/songs/';
const authData = JSON.parse(localStorage.auth);

export const getAllSongs = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOneSong = async (songId) => {
    try {
        const response = await axios.get(BASE_URL + songId, {
            headers: {
                "Authorization": `Token ${authData.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addSong = async (data) => {
    try {
        const response = await axios.post(BASE_URL, data, {
            headers: {
                "Content-Type": "application/json", "Authorization": `Token ${authData.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSong = async (songId) => {
    try {
        await axios.delete(BASE_URL + songId, {
            headers: {
                "Authorization": `Token ${authData.access_token}`
            }
        });
    } catch (error) {
        throw error;
    }
};

export const editSong = async (songId, data) => {
    try {
        const response = await axios.put(BASE_URL + songId, data, {
            headers: {
                "Content-Type": "application/json", "Authorization": `Token ${authData.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};