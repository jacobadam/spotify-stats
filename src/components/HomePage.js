import "../css/HomePage.css";
import React from "react";
import Tabs from "./Tabs";
import Login from "./Login";
import { useAuth } from "./Authentication";

export default function HomePage() {
  const { loggedIn } = useAuth();

  return (
    <div className="appContainer">
      <div className="loginBox">
        {!loggedIn ? (
          <div>
            Please login with your Spotify account, to see your track or artist
            ranking.
          </div>
        ) : (
          <h2 className="componentTitle">Listening Stats</h2>
        )}
        <Login page="homepage" />
        {loggedIn && (
          <div>
            <Tabs />
          </div>
        )}
      </div>
    </div>
  );
}
