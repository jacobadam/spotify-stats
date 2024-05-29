import "../css/Login.css";
import { React } from "react";
import { useAuth } from "./Authentication";

export default function Login({ page }) {
  const { loggedIn } = useAuth();

  const handleLogin = () => {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://jacobadam.github.io/spotify-stats"
        : "http://localhost:3000";

    if (page === "homepage") {
      window.location.href = `${baseUrl}/#/login`;
    }

    if (page === "profile") {
      window.location.href = `${baseUrl}/#/profile`;
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
