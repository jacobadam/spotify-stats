import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";
import downArrow from "./down-arrow.png";
import upArrow from "./up-arrow.png";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="account-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button onClick={toggleDropdown} className="account-button">
        Account
        <img
          src={isOpen ? upArrow : downArrow}
          alt={isOpen ? "up arrow" : "down arrow"}
          className="arrow-icon"
        />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="/profile">Profile</a>
          <a href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
