import "./HomePage.css";
import React from "react";
import Tabs from "./Tabs";
import Login from "./Login";

export default function HomePage({ loggedIn, setLoggedIn }) {
  return (
    <div className="appContainer">
      <div className="loginBox">
        {!loggedIn ? (
          <div>
            Please login with your Spotify account, to see your track or artist
            ranking.
          </div>
        ) : (
          <p>Spotify Stats</p>
        )}
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        {loggedIn && (
          <div>
            <Tabs loggedIn={loggedIn} />
          </div>
        )}
      </div>
    </div>
  );
}
