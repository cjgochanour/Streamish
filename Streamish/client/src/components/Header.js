import React from "react";
import { Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import { logout } from "../modules/authManager.js";

const Header = ({ isLoggedIn }) => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-info">
            <Link to="/" className="navbar-brand">
                StreamISH
            </Link>
            <ul className="navbar-nav mr-auto">
                {isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Feed
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/videos/add" className="nav-link">
                                New Video
                            </Link>
                        </li>
                        <NavItem>
                            <a className="nav-link" onClick={logout}>
                                Logout
                            </a>
                        </NavItem>
                    </>
                ) : (
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Login
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Header;
