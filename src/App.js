import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  const handleLogin = () => {
    // Redirect to Spotify login route on the backend server
    window.location.href = "http://localhost:3000/auth/login";
  };

  return (
    <BrowserRouter>
      <div>
        <h1>My Spotify App</h1>
        <button onClick={handleLogin}>Login with Spotify</button>
        <Routes>
          <Route path="/login" element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
