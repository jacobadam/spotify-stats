import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [nowPlaying, setNowPlaying] = useState({});
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

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        name: response.item.name,
        albumArt: response.item.album.images[0].url,
      });
    });
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!loggedIn ? (
          <button onClick={handleLogin}>Login to Spotify</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
        {loggedIn && (
          <>
            <div>Now Playing: {nowPlaying.name}</div>
            <div>
              <img src={nowPlaying.albumArt} alt="album-art" />
            </div>
          </>
        )}
        {loggedIn && (
          <button onClick={() => getNowPlaying()}>Now Playing</button>
        )}
      </header>
    </div>
  );
}

export default App;
