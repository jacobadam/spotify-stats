import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className="loginButton" onClick={goHome}>
        Go to Homepage
      </button>
    </div>
  );
};

export default NotFound;
