import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MathFunctions from "../../simulations/MathFunctions";
import PhysicsSimulation from "../../simulations/PhysicsSimulation";
import mediaSource from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

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
var c1;
var ctx;

var canvasHeight;
var canvasWidth;

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
        c1 = c.cloneNode(true);
        ctx = c.getContext("2d")
    }

    componentDidMount() {
        this.initializeCanvas();
        this.refreshCanvasVideo();
    }

    renderVideo = () => {
        console.log(v.offsetWidth);
        console.log(v.offsetHeight);
        console.log(c.offsetWidth);
        console.log(c.offsetHeight);

        canvasHeight = v.offsetHeight;
        canvasWidth = v.offsetWidth;

        var vratio = (c.offsetHeight / v.offSetHeight) * v.offsetWidth;
        var hratio = (c.offsetWidth / v.offsetWidth) * v.offsetHeight;
        ctx.drawImage(v, 0, 0,vratio,c.offsetHeight);
        ctx.drawImage(v, 0, 0,c.offsetWidth,hratio);
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
            videoPlaying: true,
            sceneBreak: false
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

        this.setState({sceneBreak: false}, 
            ()=> {
                this.playVideo(event)
            })
    }

    render() {
        return (
            <div className="originalDemoContent">
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5 text-center canvasContainer">
                        <h1><strong>Video One</strong></h1>
                        <div className="row">
                            <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item pl-3 pr-3" id="myVideo" src={mediaSource} controls></video>
                            </div>
                        </div>
                        <div className="row embed-responsive-16by9 justify-content-center">
                            <div style={responsiveCanvas}>
                                <canvas className="embed-responsive-item pl-3 pr-3" id="myCanvas" width={canvasHeight} height={canvasWidth}></canvas>
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
                                {this.state.sceneBreak &&
                                    scenes.map((scene, index) => (
                                        <button key={index} className="btn-sm btn-dark m-1" data-scene-index={index} name={"sceneBtn" + index} onClick={this.setVideoSceneTime}>Scene {index + 1}</button>
                                    ))
                                }
                                {!this.state.sceneBreak &&
                                    <p><strong>Between scenes...</strong></p>
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
                <Footer />
            </div >
        )
    }
}

export default VideoOne;
