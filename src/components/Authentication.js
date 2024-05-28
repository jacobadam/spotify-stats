import React, { createContext, useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromURL } from "../utils";

const AuthContext = createContext();

const spotifyApi = new SpotifyWebApi();

export const AuthProvider = ({ children }) => {
  const [spotifyToken, setSpotifyToken] = useState(
    localStorage.getItem("spotifyToken") || ""
  );
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("spotifyToken")
  );

  useEffect(() => {
    const tokenFromURL = getTokenFromURL().access_token;
    window.location.hash = "";

    if (tokenFromURL) {
      setSpotifyToken(tokenFromURL);
      spotifyApi.setAccessToken(tokenFromURL);
      setLoggedIn(true);
      localStorage.setItem("spotifyToken", tokenFromURL);
    } else if (spotifyToken) {
      spotifyApi.setAccessToken(spotifyToken);
    }
  }, [spotifyToken]);

  const logout = () => {
    setSpotifyToken("");
    setLoggedIn(false);
    localStorage.removeItem("spotifyToken");
  };

  return (
    <AuthContext.Provider
      value={{ spotifyToken, loggedIn, setLoggedIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
