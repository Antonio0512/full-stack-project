const BASE_URL = 'http://127.0.0.1:8000/api/'

export const register = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL + "accounts/", options);
    return await response.json();
};

export const login = async (data) => {
    const options = {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(BASE_URL + "accounts/login/", options);
    return await response.json();
};

export const profileEdit = async (data, userId) => {
  const options = {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(BASE_URL + `accounts/${userId}`, options);
  return await response.json();
};