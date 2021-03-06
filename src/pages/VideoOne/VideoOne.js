import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MathFunctions from "../../simulations/MathFunctions";
import PhysicsSimulation from "../../simulations/PhysicsSimulation";
import mediaSource from "../../videos/2DOFSpringMassSystemProof.mp4";
import playIcon from "../../images/play_icon.png";
import pauseIcon from "../../images/pause_icon.png";
import muteIcon from "../../images/mute_icon.png";
import unmuteIcon from "../../images/unmute_icon.png";
import fullScreenIcon from "../../images/fullscreen.png";
import exitFullScreenIcon from "../../images/fullscreen_exit.png";
import backArrow from "../../images/back_arrow.png";
import forwardArrow from "../../images/forward_arrow.png";
import "./style.css";

var responsiveCanvas = {
    marginBottom: "0px",
    paddingBottom: "0px",
}

var sceneArrowsContainer = {
    position: "absolute",
    top: "50%",
    marginTop: "0px",
    width: "100%"
}

var sceneArrows = {
    backgroundColor: "gold"
}

var sceneControllers = {
    position: "absolute",
    bottom: "40px",
    marginBottom: "0px",
    width: "100%"
}

var videoControllers = {
    position: "absolute",
    bottom: "0px",
    color: "white",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginBottom: "0px",
    paddingLeft: "4px",
    paddingRight: "4px"
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

var canvasContainer;
var v;
var c;
var vc; //Video controllers appearing on the canvas
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
        v = document.getElementById("myVideo");
        c = document.getElementById("myCanvas");
        canvasContainer = document.getElementById("canvasContainer");
        vc = document.getElementById("videoControllers");
        ctx = c.getContext("2d");
    }

    componentDidMount() {
        this.initializeCanvas();
        this.refreshCanvasVideo();
    }

    renderVideo = () => {

        if (v.currentTime === 0) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, c.width, c.height);
        }

        canvasHeight = v.videoHeight;
        canvasWidth = v.videoWidth;

        var vratio = (c.width / v.videoHeight) * v.videoWidth;
        ctx.drawImage(v, 0, 0, vratio, c.height);
        var hratio = (c.width / v.videoWidth) * v.videoHeight;
        ctx.drawImage(v, 0, 0, c.width, hratio);

        vc.width = canvasWidth;
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

        this.setState({ sceneBreak: false },
            () => {
                v.currentTime = scenes[selectedSceneIndex].startTime;
                this.setState({ currentSceneInfo: scenes[selectedSceneIndex] },
                    () => {
                        this.playVideo(event)
                    })
            })
    }

    setFullScreen = event => {
        event.preventDefault();
        this.setState({ fullScreen: true }, () => {
            canvasContainer.requestFullscreen();
            window.screen.orientation.lock("landscape");
        });
    }

    exitFullScreen = event => {
        event.preventDefault();
        this.setState({ fullScreen: false }, () => {
            document.exitFullscreen();
            window.screen.orientation.unlock();
        }
        )
    };

    playNextScene = event => {
        event.preventDefault();
        this.playVideo(event);
    }

    playLastScene = event => {
        event.preventDefault();

        var currentSceneIndex = this.state.currentSceneIndex;

        if (this.state.currentSceneIndex !== 0) {
            this.setState({
                currentSceneIndex: (currentSceneIndex - 1),
                currentSceneInfo: scenes[currentSceneIndex - 1],
                currentVideoTime: scenes[currentSceneIndex - 1].startTime,
                sceneBreak: false
            }, () => {
                this.playVideo(event);
            })
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
                            <div className="embed-responsive embed-responsive-16by9">
                                <video className="embed-responsive-item" id="myVideo" src={mediaSource} controls></video>
                            </div>
                        </div>
                        <div className="row mt-1 justify-content-center">
                            <div className="embed-responsive embed-responsive-16by9" style={responsiveCanvas}>
                                <div id="canvasContainer">
                                    <canvas className="embed-responsive-item" id="myCanvas" width={canvasWidth} height={canvasHeight}></canvas>
                                    {this.state.sceneBreak &&
                                        <div className="col-md-12 p-0 arrowsIcon" style={sceneArrowsContainer}>
                                            {this.state.sceneIndex != 0 &&
                                                <img className="arrowIcons float-left" id="lastSceneIcon" data-scene-index={this.state.currentSceneIndex - 1} src={backArrow} style={sceneArrows} onClick={this.setVideoSceneTime} />
                                            }
                                            {!this.state.finalScene &&
                                                <img className="arrowIcons float-right" id="nextSceneIcon" src={forwardArrow} style={sceneArrows} onClick={this.playVideo} />
                                            }
                                        </div>
                                    }
                                    <div className="col-md-6 offset-md-3" style={sceneControllers}>
                                        {this.state.sceneBreak &&
                                            scenes.map((scene, index) => (
                                                <button key={index} className="btn-sm btn-warning m-1" data-scene-index={index} name={"sceneBtn" + index} onClick={this.setVideoSceneTime}>Scene {index + 1}</button>
                                            ))
                                        }
                                    </div>
                                    <div id="videoControllers" style={videoControllers}>
                                        {this.state.videoPlaying &&
                                            <img className="videoControlIcons float-left" src={pauseIcon} onClick={this.pauseVideo} />
                                        }
                                        {!this.state.videoPlaying &&
                                            <img className="videoControlIcons float-left" src={playIcon} onClick={this.playVideo} />
                                        }
                                        {!this.state.fullScreen &&
                                            <img className="videoControlIcons float-right" src={fullScreenIcon} onClick={this.setFullScreen} />
                                        }
                                        {this.state.fullScreen &&
                                            <img className="videoControlIcons float-right" src={exitFullScreenIcon} onClick={this.exitFullScreen} />
                                        }
                                        {this.state.videoMuted &&
                                            <img className="videoControlIcons float-right" src={unmuteIcon} onClick={this.unmuteVideo} />
                                        }
                                        {!this.state.videoMuted &&
                                            <img className="videoControlIcons float-right" src={muteIcon} onClick={this.muteVideo} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <h6><strong>Seconds Elapsed</strong></h6>
                                <p>{this.state.currentVideoTime}</p>
                            </div>
                            <div className="col-md-3 text-center">
                                <h6><strong>Current Scene</strong></h6>
                                <p>{this.state.currentSceneInfo.name}</p>
                            </div>
                            <div className="col-md-3 text-center">
                                <h6><strong>Current Scene Start</strong></h6>
                                <p>{this.state.currentSceneInfo.startTime} seconds</p>
                            </div>
                            <div className="col-md-3 text-center">
                                <h6><strong>Current Scene End</strong></h6>
                                {!this.state.finalScene &&
                                    <p>{this.state.currentSceneInfo.endTime} seconds</p>
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
