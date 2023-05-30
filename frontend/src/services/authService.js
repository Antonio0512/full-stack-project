const BASE_URL = 'http://127.0.0.1:8000/api/accounts/'
const authData = JSON.parse(localStorage.auth);

export const register = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL, options);
    return await response.json();
};

export const login = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL + "login/", options);
    return await response.json();
};

export const profileEdit = async (data, userId) => {
    const token = authData.access_token;

    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(BASE_URL + userId, options);
    return await response.json();
};

export const profileDelete = async (userId) => {
    const token = authData.access_token

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
    };

    await fetch(BASE_URL + userId, options)
};