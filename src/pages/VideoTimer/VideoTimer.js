import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Video from "../../videos/2DOFSpringMassSystemProof.mp4";
import  MathFunctions  from "../../simulations/MathFunctions";
import  PhysicsSimulation  from "../../simulations/PhysicsSimulation";
import "./style.css";



class VideoTimer extends Component {

    state = {
        currentVideoTime: 0.00
    }

    componentDidMount() {
        this.checkVideoTime();
        //this.renderCanvas();
        //MathFunctions.MathFunctions();
        
    }

    currentVideoTime = () => {
        var testVideo = document.getElementById("testVideo");
        this.setState({ currentVideoTime: testVideo.currentTime })
    }

    checkVideoTime = () => setInterval(() => {
        this.currentVideoTime();
        this.renderCanvas();
    }, 100);


    
    renderCanvas = () => {
        var c = document.getElementById("videoCanvas");

        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.font = "30px Arial";
        ctx.fillStyle = "gold";
        ctx.fillText(this.state.currentVideoTime, 10, 125);

    }
    
    render() {
        return (
            <div>
                <Navbar />
                <div className="container pt-4">
                    <div className="row">
                        <div className="col-md-12 my-5 text-center">
                            <div className="embed-responsive embed-responsive-16by9 canvasContainer">
                                <video className="embed-responsive-item" id="testVideo" controls>
                                    <source src={Video} type="video/mp4" />
                                </video>
                            </div>
                            <h6><strong>Seconds Elapsed:</strong></h6>
                            <p>{this.state.currentVideoTime}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 my-5 text-center">
                            <canvas className="embed-responsive embed-responsive-16by9 canvasContainer" id="videoCanvas">
                            </canvas>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoTimer;
