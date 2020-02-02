import React from "react";
import "./style.css";

function Navbar(props) {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
            <a className="navbar-brand" href="/"><strong>Interactive Video Collaboration</strong></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link" href="/">Home</a>
                    <a className="nav-item nav-link" href="/video-one">Video One</a>
                    <a className="nav-item nav-link" href="/video-timer">Video Timer</a>
                    <a className="nav-item nav-link" href="/about">About</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
