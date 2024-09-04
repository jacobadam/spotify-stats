import "../css/App.css";
import React from "react";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import Header from "./Header";
import Login from "./Login";
import NotFound from "./NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Authentication";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
