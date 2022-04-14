const baseUrl = "/api/video";

export const getAllVideos = () => {
    return fetch(`${baseUrl}/GetWithComments`).then((res) => res.json());
};

export const getVideo = (id) => {
    return fetch(`${baseUrl}/GetWithComments/${id}`).then((res) => res.json());
};

export const getUserVideos = (id) => {
    return fetch(`${baseUrl}/GetWithVideos/${id}`).then((res) => res.json());
};

export const addVideo = (video) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
    });
};

export const searchVideo = (query, sort) => {
    return fetch(`${baseUrl}/search?q=${query}&sortDesc=${sort}`).then((res) => res.json());
};
