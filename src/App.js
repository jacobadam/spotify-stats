import "./App.css";
import React from "react";
import Dropdown from "./Dropdown";
import spotifylogo from "./spotifylogo.png";
import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <header className="appHeader">
        <img className="spotifyLogo" src={spotifylogo} alt="Spotify Logo" />
        <div className="dropdownContainer">
          <Dropdown />
        </div>
      </header>

      <HomePage />
    </div>
  );
}

export default App;
