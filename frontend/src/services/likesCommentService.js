import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/music/songs/';
const authData = JSON.parse(localStorage.auth);

export const getLikesAndDislikes = async (songId) => {
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

export const getComments = async (songId) => {
    try {
        const response = await axios.get(`${BASE_URL}${songId}/comments/`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to retrieve comments');
    }
};


export const postComment = async (comment, songId) => {
    try {
        const headers = {
            'Authorization': `Token ${authData.access_token}`
        };

        const response = await axios.post(`${BASE_URL}${songId}/comments/`, comment, {headers});

        return response.data;
    } catch (error) {
        throw new Error('Failed to post comment');
    }
};

