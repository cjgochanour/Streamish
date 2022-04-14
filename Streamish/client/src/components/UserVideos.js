import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserVideos } from "../modules/videoManager.js";
import Search from "./Search.js";
import Video from "./Video.js";

export const UserVideos = () => {
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    const getVideos = () => {
        getUserVideos(id).then((videos) => setVideos(videos));
    };

    useEffect(() => {
        getVideos();
    }, [id]);

    return (
        <>
            <div className="container">
                <Search stateSetter={setVideos} />
                <div className="row justify-content-center">
                    {videos.map((video) => (
                        <Video video={video} key={video.id} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default UserVideos;
