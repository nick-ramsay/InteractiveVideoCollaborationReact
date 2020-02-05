import React from "react";
import "./style.css";
import GithubLogo from "../../images/GitHub_Logo_White.png";

function Footer(props) {

    return (
        <footer className="footer bg-custom fixed-bottom">
            <div className="container">
                <a href="https://github.com/nick-ramsay/InteractiveVideoCollaborationReact"><img src={GithubLogo} width="60px"/></a>
            </div>
        </footer>
    )
}

export default Footer;
