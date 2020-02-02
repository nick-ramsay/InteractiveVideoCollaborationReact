import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import VideoTimer from "./pages/VideoTimer/VideoTimer";
import VideoOne from "./pages/VideoOne/VideoOne";
import About from "./pages/About/About";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
     <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/video-timer" component={VideoTimer} />
          <Route exact path="/video-one" component={VideoOne} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
