import React, { useState, useRef, useEffect } from "react";
import "../css/Dropdown.css";
import downArrow from "../icons/down-arrow.png";
import upArrow from "../icons/up-arrow.png";
import { useAuth } from "./Authentication";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="accountDropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        aria-label="Account dropdown"
        className="accountButton"
      >
        Account
        <img
          src={isOpen ? upArrow : downArrow}
          alt={isOpen ? "up arrow" : "down arrow"}
          className="arrowIcon"
        />
      </button>
      {isOpen && (
        <div className="dropdownMenu">
          <a href="/profile" aria-label="profile">
            Profile
          </a>
          <a href="/logout" aria-label="logout" onClick={handleLogout}>
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
