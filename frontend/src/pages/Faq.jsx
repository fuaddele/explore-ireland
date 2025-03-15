import React from "react";
import Navbar from "./Navbar";
import "../css/Faq.css";

const Faq = () => {
  return (
    <div className="faq-container">
      <Navbar />
      <section
        className="faq"
        style={{
          backgroundColor: "#294b33",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "white" }}>Frequently Asked Questions</h2>
        <div className="faq-item" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>What is Explore Ireland?</h3>
          <p>
            Explore Ireland is a platform takes you to where you wanna go without delay.
          </p>
        </div>
        <div className="faq-item" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>
            Can I change my email if I need to?
          </h3>
          <p>
            Of course you can, just update your information in your user profile section.
          </p>
        </div>
        <div className="faq-item" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>
            Can I leave reviews for attractions?
          </h3>
          <p>Yes! You can leave reviews for attractions on the Reviews page.</p>
        </div>
      </section>

      {/* Add FAQ Button with href */}
      <a
        href="/add-faq"
        className="add-faq-button"
        style={{
          marginTop: "20px",
          display: "inline-block",
          textDecoration: "none",
        }}
      >
        Ask a Question
      </a>
    </div>
  );
};

export default Faq;
