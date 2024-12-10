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
            Explore Ireland is a platform that showcases the best tourist
            attractions across Ireland.
          </p>
        </div>
        <div className="faq-item" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginBottom: "5px" }}>
            How can I add my favorite attractions?
          </h3>
          <p>
            You can add your favorite attractions by clicking the 'Add to
            Favourites' button on each attraction page.
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
        Add FAQ
      </a>
    </div>
  );
};

export default Faq;
