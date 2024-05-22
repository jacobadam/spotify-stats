import "./App.css";
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "./utils";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
      <div className="App">
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Routes>
          <Route>
            <Route
              path="/"
              element={
                <HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
              }
            />
            <Route path="/profile" element={<MyProfile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
