import "./Header.css";
import React from "react";
import Dropdown from "./Dropdown";
import spotifylogo from "./spotifylogo.png";
import { useAuth } from "./Authentication";

export default function Header() {
  const { loggedIn } = useAuth();

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
