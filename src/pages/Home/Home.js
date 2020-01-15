import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Video from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

class Home extends Component {
    state = {
        currentVideoTime: 0.00
    }

    componentDidMount() {
        this.checkVideoTime();
        this.renderCanvas();
    }

    currentVideoTime = () => {
        var testVideo = document.getElementById("testVideo");
        this.setState({ currentVideoTime: testVideo.currentTime })
    }

    checkVideoTime = () => setInterval(() => {
        this.currentVideoTime()
        this.renderCanvas();
    }, 100);

    renderCanvas = () => {
        var c = document.getElementById("cv1");
        
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
                    <div className="col-md-12 my-5 text-center">
                        <div>
                            <video id="testVideo" controls>
                                <source src={Video} type="video/mp4" />
                            </video>
                            <canvas class="canvas" id="cv1">{this.state.currentVideoTime}</canvas>
                        </div>
                        <h3><strong>Seconds Elapsed: {this.state.currentVideoTime}</strong></h3>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;