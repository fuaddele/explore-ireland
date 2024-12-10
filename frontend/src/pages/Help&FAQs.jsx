import React from "react";
import "../css/Help_FAQ.css";
import Navbar from "./Navbar"; // Import the Navbar component

const HelpAndFAQs = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* FAQ Section */}
      <section className="faq-section">
        <h1>Help & FAQs</h1>
        <div className="faq-item">
          <p className="faq-question">
            Q: How do I create a personalized itinerary?
          </p>
          <p className="faq-answer">
            A: Sign up, browse attractions, and add them to your favourites.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Q: Can I view tourist spots on a map?</p>
          <p className="faq-answer">
            A: Yes! Use our interactive map to find attractions, accommodations,
            and restaurants nearby.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Q: Is the website mobile-friendly?</p>
          <p className="faq-answer">
            A: Absolutely! Our site is optimized for use on smartphones,
            tablets, and desktops.
          </p>
        </div>

        {/* Conditionally render the Ask button */}
        {/* <button className="ask-button" disabled>
          Ask
        </button> */}
      </section>
    </div>
  );
};

export default HelpAndFAQs;
