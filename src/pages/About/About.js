import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./style.css";

class About extends Component {
    state = {

    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container pt-4">
                    <div className="col-md-12 my-5 text-center">
                        <h2>Hi There!</h2>
                        <p>Here is a page that will eventually have some information about this application. Stay tuned!</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default About;