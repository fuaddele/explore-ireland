// Navbar.js

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
  const [isNavActive, setNavActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication status based on token
    if (!token) {
      navigate("/signin"); // Redirect if token is not available
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication status
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <header className="navbar">
      <div className="logo">Explore Ireland</div>
      <button className="nav-toggle" onClick={() => setNavActive(!isNavActive)}>
        ☰
      </button>
      <nav className={`nav-links ${isNavActive ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/landing">Home</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/reviews">Reviews</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="logout-button"
                aria-label="Logout"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
