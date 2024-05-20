import { React } from "react";
import "./Login.css";

export default function Login({ loggedIn, setLoggedIn }) {
  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  // const handleLogout = () => {
  //   setLoggedIn(false);
  // };

  return (
    <>
      {!loggedIn && (
        <button className="loginButton" onClick={handleLogin}>
          Login with Spotify
        </button>
      )}

      {/* {loggedIn && (
        <button className="loginButton" onClick={handleLogout}>
          Login with Spotify
        </button>
      )} */}
    </>
  );
}
