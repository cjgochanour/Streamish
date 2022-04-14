import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Label, FormGroup, Container, Col, Button } from "reactstrap";
import { addVideo } from "../modules/videoManager.js";

export const VideoForm = ({ getVideos }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const history = useHistory();

    const makeNewVideoHappen = () => {
        //make a new video object using the state given by user
        const video = {
            Title: title,
            Description: description,
            Url: url,
        };
        addVideo(video).then(() => {
            getVideos();
            setTitle("");
            setDescription("");
            setUrl("");
            history.push("/");
        });
    };

    return (
        <Container>
            <Form>
                <FormGroup row>
                    <Label sm={2}>Title: </Label>
                    <Col>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>Description</Label>
                    <Col>
                        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>URL</Label>
                    <Col>
                        <Input value={url} onChange={(e) => setUrl(e.target.value)} />
                    </Col>
                </FormGroup>
                <Button onClick={(e) => makeNewVideoHappen()}>Submit</Button>
            </Form>
        </Container>
    );
};

export default VideoForm;
