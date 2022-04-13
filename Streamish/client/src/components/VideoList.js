import React, { useEffect, useState } from "react";
import Video from "./Video";
import { Form, Input, Label, Button } from "reactstrap";
import { getAllVideos, searchVideo } from "../modules/videoManager";
import Search from "./Search.js";
import { VideoForm } from "./VideoForm.js";

const VideoList = ({ searchResults }) => {
    const [videos, setVideos] = useState([]);

    const getVideos = () => {
        getAllVideos().then((videos) => setVideos(videos));
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <div className="container">
                <VideoForm getVideos={getVideos} />
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

export default VideoList;
