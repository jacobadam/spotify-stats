import "../css/Login.css";
import { React } from "react";
import { useAuth } from "./Authentication";

export default function Login({ page }) {
  const { loggedIn } = useAuth();

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
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
