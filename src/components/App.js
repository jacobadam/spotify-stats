import "../css/App.css";
import React from "react";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Authentication";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<MyProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
