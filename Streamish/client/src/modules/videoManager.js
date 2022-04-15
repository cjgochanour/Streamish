import { getToken } from "./authManager.js";

const baseUrl = "/api/video";

export const getAllVideos = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetWithComments`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Unknown error getting videos");
            }
        });
    });
};

export const getVideo = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetWithComments/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Error getting video");
            }
        });
    });
};

export const getUserVideos = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetWithVideos/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error();
            }
        });
    });
};

export const addVideo = (video) => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(video),
        });
    });
};

export const searchVideo = (query, sort) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/search?q=${query}&sortDesc=${sort}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("error finding videos");
            }
        });
    });
};
