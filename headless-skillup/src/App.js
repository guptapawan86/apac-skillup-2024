import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./images/headless-logo.jpeg";
import Home from "./components/Home";
import Event from "./components/Event";
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to={"/"}>
            <img src={logo} className="logo" alt="AEM Logo"/>
          </Link>

          <hr />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:eventTitle" element={<Event />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
