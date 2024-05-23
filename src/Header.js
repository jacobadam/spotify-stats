import "./Header.css";
import React from "react";
import Dropdown from "./Dropdown";
import spotifylogo from "./spotifylogo.png";
import { useAuth } from "./Authentication";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="appHeader">
      <img
        className="spotifyLogo"
        src={spotifylogo}
        alt="Spotify Logo"
        onClick={handleLogoClick}
        style={{ cursor: "pointer" }}
      />
      {loggedIn && (
        <div className="dropdownContainer">
          <Dropdown />
        </div>
      )}
    </header>
  );
}
