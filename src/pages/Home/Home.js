import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Images from "../../images/video-one.jpg";
import "./style.css";

var cardStyle = {
    width: "18rem"
}

class Home extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5">
                        <div className="row" align="center">
                            <div className="col-md-6">
                                <div class="card" style={cardStyle}>
                                    <div class="card-body">
                                        <h5 class="card-title">Video One</h5>
                                        <p class="card-text">Currently Under Development: This page contains the prototype for the video and simulation solution.</p>
                                        <a href="/video-one" class="btn btn-primary">Video One</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div class="card" style={cardStyle}>
                                    <div class="card-body">
                                        <h5 class="card-title">Video Timer</h5>
                                        <p class="card-text">An initial page used as sandbox to test tracking video time.</p>
                                        <a href="/video-timer" class="btn btn-primary">Video Timer</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
