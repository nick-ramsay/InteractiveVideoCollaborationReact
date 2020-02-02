import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MathFunctions from "../../simulations/MathFunctions";
import PhysicsSimulation from "../../simulations/PhysicsSimulation";
import mediaSource from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

var parentStyle = {
    margin: "0 auto"
}

var responsiveCanvas = {
    marginBottom: "0px",
    paddingBottom: "0px"
}

var scenes = [
    {
        name: "Scene 1",
        startTime: 0,
        endTime: 5
    },
    {
        name: "Scene 2",
        startTime: 5,
        endTime: 10
    },
    {
        name: "Scene 3",
        startTime: 10,
        endTime: 15
    },
    {
        name: "Scene 4",
        startTime: 15,
        endTime: 20
    }
]

var v;
var c;
var ctx;

class VideoOne extends Component {

    state = {
        scenes: scenes,
        finalScene: false,
        videoPlaying: false,
        videoMuted: false,
        sceneBreak: false,
        currentVideoTime: 0.00,
        currentSceneIndex: 0,
        currentSceneInfo: scenes[0]
    }

    currentSceneCheck = () => {
        for (let i = 0; i < scenes.length; i++) {
            if (this.state.currentVideoTime >= scenes[i].startTime && this.state.currentVideoTime < scenes[i].endTime) {
                this.betweenScenePause();
                this.setState({ currentSceneIndex: i, currentSceneInfo: scenes[i] })
            }
        }
    }

    betweenScenePause = () => {
        console.log(this.state.currentSceneIndex === (scenes.length - 1));
        if (this.state.currentSceneIndex !== (scenes.length - 1)) {
            this.setState({ finalScene: false });
        }
        if (this.state.currentVideoTime >= this.state.currentSceneInfo.endTime && this.state.finalScene === false) {
            this.setState({ sceneBreak: true, videoPlaying: false },
                () => {
                    if (this.state.currentSceneIndex == (scenes.length - 1)) {
                        this.setState({ finalScene: true });
                    }
                    v.pause();
                })
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

    setVideoSceneTime = event => {
        event.preventDefault();

        var selectedSceneIndex = event.currentTarget.dataset.sceneIndex;

        v.currentTime = scenes[selectedSceneIndex].startTime;

        this.playVideo(event);

        console.log(selectedSceneIndex);
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
                        <div className="row justify-content-center">
                            <div style={responsiveCanvas}>
                                <canvas className="canvasContainer" id="myCanvas" width="854" height="480"></canvas>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <h6><strong>Seconds Elapsed</strong></h6>
                                <p>{this.state.currentVideoTime}</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <h6><strong>Current Scene Index</strong></h6>
                                <p>{this.state.currentSceneInfo.name}</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <h6><strong>Current Scene Start/End</strong></h6>
                                <p>Start: {this.state.currentSceneInfo.startTime}</p>
                                {!this.state.finalScene &&
                                    <p> End: {this.state.currentSceneInfo.endTime}</p>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h4><strong>Scene Controllers</strong></h4>
                                {scenes.map((scene, index) => (
                                    <button key={index} className="btn-sm btn-dark m-1" data-scene-index={index} name={"sceneBtn" + index} onClick={this.setVideoSceneTime}>Scene {index + 1}</button>
                                ))
                                }
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
            </div >
        )
    }
}

export default VideoOne;
