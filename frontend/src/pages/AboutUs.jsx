import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import "../css/AboutUs.css";
import logo from "../assets/images/WhatsApp Image 2024-11-04 at 16.14.38_e39ad1e6.jpg";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Navbar */}
      <Navbar />

      {/* Main About Us Section */}
      <main className="about-section">
        <div className="about-content">
          <div className="flag-container">
            <img
              src={logo} // Use curly braces to correctly reference the imported logo
              alt="Irish Flag"
              className="irish-flag"
            />
          </div>
          <div className="text-content">
            <h2>About Us</h2>
            <p>
              Welcome to <strong>Explore Ireland</strong>, your ultimate guide
              to discovering the beauty, history, and culture of Ireland!
              Whether you're a first-time visitor or a seasoned explorer, our
              platform is designed to make your travel experience unforgettable.
              From iconic landmarks to hidden gems, we offer detailed
              information, user reviews, and personalized trip-planning tools to
              help you explore everything this incredible country has to offer.
            </p>
            <p>
              At <strong>Explore Ireland</strong>, we’re passionate about
              showcasing the rich heritage and natural wonders of Ireland. Our
              mission is to provide an easy-to-use, interactive platform that
              allows you to plan your perfect itinerary, discover new
              destinations, and make the most of your trip.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
};

export default AboutUs;
