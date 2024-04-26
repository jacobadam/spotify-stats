import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "./utils";
import Tabs from "./Tabs";
import Login from "./Login";

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

  return (
    <div className="App">
      <header className="App-header">
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Tabs loggedIn={loggedIn} />
      </header>
    </div>
  );
}

export default App;
