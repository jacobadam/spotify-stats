import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "./utils";
import Tabs from "./Tabs";
import Login from "./Login";
import spotifylogo from "./spotifylogo.png";

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

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="spotifylogo" src={spotifylogo} alt="Spotify Logo" />
        </div>

        <div className="loginBox">
          {!loggedIn ? (
            <div>
              Please login with your spotify account, to see your track or
              artist ranking!
            </div>
          ) : (
            <div>Spotify Stats</div>
          )}
          <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          {loggedIn && (
            <div>
              <Tabs loggedIn={loggedIn} />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
