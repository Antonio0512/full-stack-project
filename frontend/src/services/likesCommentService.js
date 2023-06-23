import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/music/songs/';
const authData = JSON.parse(localStorage.auth);

export const getLikes = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        const response = await axios.get(`${BASE_URL}${songId}/like/`, {headers});
        return response.data;
    } catch (error) {
        console.log("Failed to get likes count:", error);
        return null;
    }
};

export const postLikes = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        const response = await axios.post(`${BASE_URL}${songId}/like/`, null, {headers});
        return response.data;
    } catch (error) {
        console.log("Failed to like the song:", error);
        return null;
    }
};

export const getDislikes = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        const response = await axios.get(`${BASE_URL}${songId}/dislike/`, {headers});
        return response.data;
    } catch (error) {
        console.log("Failed to get dislikes count:", error);
        return null;
    }
};

export const postDislikes = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        const response = await axios.post(`${BASE_URL}${songId}/dislike/`, null, {headers});
        return response.data;
    } catch (error) {
        console.log("Failed to dislike the song:", error);
        return null;
    }
};
