import "./App.css";
import React from "react";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<MyProfile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
