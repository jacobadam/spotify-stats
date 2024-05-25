import "./Login.css";
import { React } from "react";
import { useAuth } from "./Authentication";

export default function Login({ page }) {
  const { loggedIn } = useAuth();

  const handleLogin = () => {
    if (page === "homepage") {
      window.location.href = "http://localhost:8888/login";
    }

    if (page === "profile") {
      window.location.href = "http://localhost:8888/profile";
    }
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
