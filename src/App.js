import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "./utils";
import Tabs from "./Tabs";

const spotifyApi = new SpotifyWebApi();

function App() {
  // eslint-disable-next-line
  const [spotifyToken, setSpotifyToken] = useState("");
  // const [topArtists, setTopArtists] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // console.log(topArtists);

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

  // const getTopTracks = () => {
  //   spotifyApi.getMyTopTracks().then((response) => {
  //     const topArtistsData = response.items;
  //     setTopArtists([...topArtistsData]);
  //   });
  // };

  // console.log(topArtists[0]);

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
        {/* {loggedIn && (
          <button onClick={() => getTopTracks()}>Get Top Tracks</button>
        )} */}

        <Tabs loggedIn={loggedIn} />

        {/* {loggedIn && topArtists.length > 0 && (
          <ul>
            {topArtists.map((topArtist) => (
              <div key={topArtist.id}>
                {topArtist.artists[0].name} - {topArtist.name}
              </div>
            ))}
          </ul>
        )} */}
      </header>
    </div>
  );
}

export default App;
