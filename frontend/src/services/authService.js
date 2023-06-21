import axios from "axios";

const authBaseUrl = 'http://127.0.0.1:8000/api/accounts/';

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

export const profileEdit = async (data, userId, authToken) => {
  try {
    const response = await axios.put(authBaseUrl + userId, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${authToken}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const profileDelete = async (userId, authToken) => {
  try {
    await axios.delete(authBaseUrl + userId, {
      headers: {
        "Authorization": `Token ${authToken}`
      }
    });
  } catch (error) {
    throw error;
  }
};
