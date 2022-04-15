import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoList from "./VideoList";
import VideoForm from "./VideoForm";
import VideoDetails from "./VideoDetails.js";
import UserVideos from "./UserVideos.js";
import { Redirect } from "react-router-dom";
import Login from "./Login.js";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <VideoList /> : <Redirect to="/login" />}
            </Route>

            <Route path="/videos/add">{isLoggedIn ? <VideoForm /> : <Redirect to="/login" />}</Route>

            <Route path="/videos/:id">{isLoggedIn ? <VideoDetails /> : <Redirect to="/login" />}</Route>

            <Route path="/users/:id">{isLoggedIn ? <UserVideos /> : <Redirect to="/login" />}</Route>

            <Route path="/login">{!isLoggedIn ? <Login /> : <Redirect to="/" />}</Route>
        </Switch>
    );
};

export default ApplicationViews;
