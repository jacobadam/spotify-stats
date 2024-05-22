import "./Header.css";
import React from "react";
import Dropdown from "./Dropdown";
import spotifylogo from "./spotifylogo.png";

export default function Header({ loggedIn }) {
  console.log(loggedIn);
  return (
    <header className="appHeader">
      <img className="spotifyLogo" src={spotifylogo} alt="Spotify Logo" />
      {loggedIn && (
        <div className="dropdownContainer">
          <Dropdown />
        </div>
      )}
    </header>
  );
}
