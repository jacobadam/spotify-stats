import React, { useState } from "react";
import "./Dropdown.css";

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="account-dropdown">
      <button onClick={toggleDropdown} className="account-button">
        Account
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
