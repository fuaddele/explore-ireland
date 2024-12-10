import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css"; // For styles

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists and redirect to landing page if so
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/landing"); // Redirect if user is already logged in
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Explore Ireland</h1>
      <p>Discover Ireland's History, Culture, and Hidden Gems</p>
      <div className="button-container">
        <a href="/signup" className="btn signup-btn">
          Sign Up
        </a>
        <a href="/signin" className="btn login-btn">
          Log In
        </a>
      </div>
    </div>
  );
};

export default HomePage;
