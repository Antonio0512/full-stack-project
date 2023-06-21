import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/music/songs/';
const authData = JSON.parse(localStorage.auth);

export const getLikesCount = async (songId) => {
    try {
        const response = await axios.get(BASE_URL + songId + '/like/');
        return response.data.all_likes;
    } catch (error) {
        console.log("Failed to get likes count:", error);
        return 0;
    }
};

export const likeSong = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        await axios.post(BASE_URL + songId + '/like/', null, {headers});
    } catch (error) {
        console.log("Failed to like the song:", error);
    }
};

export const unlikeSong = async (songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        await axios.post(BASE_URL + songId + '/like/', null, {headers});
    } catch (error) {
        console.log("Failed to unlike the song:", error);
    }
};
