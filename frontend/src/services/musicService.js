const BASE_URL = "http://127.0.0.1:8000/api/music/songs/"


export const getAllSongs = async () => {
    const response = await fetch(BASE_URL);
    return await response.json();
}

export const addSong = async (data) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(BASE_URL, options);
    return await response.json()
}

export const deleteSong = async () => {}

export const editSong = async (songId, data) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL + songId, options);
    return await response.json();
};