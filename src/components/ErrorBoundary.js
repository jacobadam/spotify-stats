import React, { Component } from "react";
import spotifylogo from "../icons/spotifylogonotext.png";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error caught by ErrorBoundary:", error);
      console.info("Error info:", info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <img
            src={spotifylogo}
            alt="Error"
            style={{
              display: "block",
              margin: "0 auto",
              width: "100px",
              height: "auto",
              cursor: "pointer",
            }}
          />
          <h1>Page not available.</h1>
          <p>We're currently looking into this. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
