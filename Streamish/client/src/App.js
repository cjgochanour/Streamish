import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spinner } from "reactstrap";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import Header from "./components/Header.js";
import { onLoginStatusChange } from "./modules/authManager.js";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        onLoginStatusChange(setIsLoggedIn);
    }, []);

    if (isLoggedIn === null) {
        return <Spinner />;
    }
    return (
        <div className="App">
            <Router>
                <Header />
                <ApplicationViews />
            </Router>
        </div>
    );
}

export default App;
