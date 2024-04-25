import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "./utils";
import Tabs from "./Tabs";

const spotifyApi = new SpotifyWebApi();

function App() {
  // eslint-disable-next-line
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const tokenFromURL = getTokenFromURL().access_token;
    window.location.hash = "";

    if (tokenFromURL) {
      setSpotifyToken(tokenFromURL);
      spotifyApi.setAccessToken(tokenFromURL);
      setLoggedIn(true);
    }
  }, []);

  // console.log(spotifyApi);

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          {!loggedIn ? (
            <button className="loginButton" onClick={handleLogin}>
              Login to Spotify
            </button>
          ) : (
            <button className="logoutButton" onClick={handleLogout}>
              Logout
            </button>
          )}
        </>

        <Tabs loggedIn={loggedIn} />
      </header>
    </div>
  );
}

export default App;
