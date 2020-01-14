import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Video from "../../videos/2DOFSpringMassSystemProof.mp4";
import "./style.css";

class Home extends Component {
    state = {

    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5 bg-white rounded">
                        <video controls>
                            <source src={Video} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;