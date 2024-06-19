import "../css/Login.css";
import React from "react";
import { useAuth } from "./Authentication";

export default function Login() {
  const { loggedIn } = useAuth();

  const handleLogin = () => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://listening-stats-jn-d508a73704b2.herokuapp.com/callback"
        : "http://localhost:8888";

    window.location.href = `${baseUrl}/login`;
  };

  return (
    <>
      {!loggedIn && (
        <button
          className="loginButton"
          aria-label="login"
          onClick={handleLogin}
        >
          Login with Spotify
        </button>
      )}
    </>
  );
}
