import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MathFunctions from "../../simulations/MathFunctions";
import PhysicsSimulation from "../../simulations/PhysicsSimulation";
import mediaSource from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

var parentStyle = {
    margin: "0 auto",
    width: "888px"
}

var scenes = [
    {endTime: 5},
    {endTime: 10},
    {endTime: 15},
    {endTime: 20}
]

var v;
var c;
var ctx;

class VideoOne extends Component {

    state = {
        videoPlaying: false,
        videoMuted: false,
        currentVideoTime: 0.00,
        currentSceneIndex: 0,
        currentSceneInfo: scenes[0]
    }

    currentSceneCheck = () => {
        for (let i = 0; i < scenes.length; i++) {
            if (this.state.currentVideoTime > scenes[i].endTime) {
                this.setState({currentSceneIndex: i+1, currentSceneInfo: scenes[i+1]})
            }
        }
    }

    initializeCanvas = () => {
        v = document.getElementById("myVideo")
        c = document.getElementById("myCanvas")
        ctx = c.getContext("2d")
    }

    componentDidMount() {
        this.initializeCanvas();
        this.refreshCanvasVideo();
    }

    renderVideo = () => {
        ctx.drawImage(v, 0, 0);
    }

    refreshCanvasVideo = () => setInterval(() => {
        this.renderVideo();
        this.currentVideoTime();
        this.currentSceneCheck();
    }, 20);

    currentVideoTime = () => {
        this.setState({ currentVideoTime: v.currentTime })
    }

    playVideo = event => {
        event.preventDefault();

        this.setState({
            videoPlaying: true
        }, () => {
            this.handleVideoControls()
        });

    }

    pauseVideo = event => {
        event.preventDefault();

        this.setState({
            videoPlaying: false
        }, () => {
            this.handleVideoControls()
        })

    }

    muteVideo = event => {
        event.preventDefault();

        this.setState({
            videoMuted: true
        }, () => {
            this.handleVideoControls()
        })
    }


    unmuteVideo = event => {
        event.preventDefault();

        this.setState({
            videoMuted: false
        }, () => {
            this.handleVideoControls()
        })
    }

    handleVideoControls = () => {
        if (this.state.videoPlaying) {
            v.play();
        }
        if (!this.state.videoPlaying) {
            v.pause();
        }
        if (this.state.videoMuted) {
            v.muted = true;
        }
        if (!this.state.videoMuted) {
            v.muted = false;
        }
    }

    render() {
        return (
            <div className="originalDemoContent">
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5 text-center canvasContainer">
                        <h1><strong>Video One</strong></h1>
                        <div className="row d-none">
                            <div class="parent" style={parentStyle}>
                                <video id="myVideo" src={mediaSource} controls></video>
                            </div>
                        </div>
                        <div className="row">
                            <div class="parent justify-content-center" style={parentStyle}>
                                <canvas id="myCanvas" width="888" height="500"></canvas>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <h6><strong>Seconds Elapsed:</strong></h6>
                                <p>{this.state.currentVideoTime}</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <h6><strong>Current Scene Index:</strong></h6>
                                <p>Scene: {this.state.currentSceneIndex + 1}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h4><strong>Scene Controllers</strong></h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <h4><strong>Video Controllers</strong></h4>
                            </div>
                            <div className="col-md-4 mb-1 text-center">
                                {!this.state.videoPlaying &&
                                    <button className="btn-sm btn-success" name="playBtn" onClick={this.playVideo}>Play</button>
                                }
                                {this.state.videoPlaying &&
                                    <button className="btn-sm btn-danger" name="pauseBtn" onClick={this.pauseVideo}>Pause</button>
                                }
                            </div>
                            <div className="col-md-4 mb-1">
                                {!this.state.videoMuted &&
                                    <button className="btn-sm btn-warning" name="muteBtn" onClick={this.muteVideo}>Mute</button>
                                }
                                {this.state.videoMuted &&
                                    <button className="btn-sm btn-primary" name="unmutedBtn" onClick={this.unmuteVideo}>Unmute</button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoOne;
