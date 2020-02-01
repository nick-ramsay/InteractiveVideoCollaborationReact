import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Video from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

var parentStyle = {
    margin: "0 auto", 
    width: "888px"
}

class OriginalDemo extends Component {

    state = {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5 text-center">
                        <h1><strong>React Conversion of Original Demo</strong></h1>
                        <div className="row canvasContainer">
                            <div class="parent" style={parentStyle}>
                                <canvas id="myCanvas" width="888" height="500" ></canvas>
                                <div id="custom-seekbar">
                                    <span></span>
                                </div>
                                <div class="mute"></div>
                                <div id="myButton" class='button play' type="button"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OriginalDemo;
