const BASE_URL = "http://127.0.0.1:8000/api/music/songs/"
const authData = JSON.parse(localStorage.auth);

export const getAllSongs = async () => {
    // const token = authData.access_token

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Token ${token}`
        }
    };

    const response = await fetch(BASE_URL, options);
    return await response.json();
};

export const getOneSong = async (songId) => {
    const token = authData.access_token;

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
    };

    const response = await fetch(BASE_URL + songId, options);
    return await response.json();
};

export const addSong = async (data) => {
    const token = authData.access_token

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASE_URL, options);
    return await response.json()
};

export const deleteSong = async (songId) => {
    const token = authData.access_token;

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };
    await fetch(BASE_URL + songId, options);
};

export const editSong = async (songId, data) => {
    const token = authData.access_token;
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL + songId, options);
    return await response.json();
};