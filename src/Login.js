import "./Login.css";
import { React } from "react";
import { useAuth } from "./Authentication";

export default function Login() {
  const { loggedIn } = useAuth();

  const handleLogin = () => {
    window.location.href = "http://localhost:8888/login";
  };

  return (
    <>
      {!loggedIn && (
        <button className="loginButton" onClick={handleLogin}>
          Login with Spotify
        </button>
      )}
    </>
  );
}
