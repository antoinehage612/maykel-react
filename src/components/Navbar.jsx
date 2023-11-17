import React from "react";
import "./Navbar/Navbar.css";
import logo from "../Assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        <img src={logo} alt="Logo" />
      </a>
      <div className="name">3AL 7ATAB</div>
    </nav>
  );
};

export default Navbar;
