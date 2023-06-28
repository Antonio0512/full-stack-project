import axios from "axios";

const authBaseUrl = 'http://127.0.0.1:8000/api/accounts/';
const authData = JSON.parse(localStorage.auth);

export const register = async (data) => {
    try {
        const response = await axios.post(authBaseUrl, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data) => {
    try {
        const response = await axios.post(authBaseUrl + 'login/', data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profileEdit = async (data, userId) => {
    try {
        const response = await axios.put(authBaseUrl + userId, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authData.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profileDelete = async (userId) => {
    try {
        await axios.delete(authBaseUrl + userId, {
            headers: {
                "Authorization": `Token ${authData.access_token}`
            }
        });
    } catch (error) {
        throw error;
    }
};
