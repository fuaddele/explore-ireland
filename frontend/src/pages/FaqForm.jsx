import React, { useState } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import "../css/FaqForm.css";

const FaqForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    faq: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await fetch("http://localhost:5000/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data as a JSON object
      });

      const data = await response.json();
      setLoading(false); // Set loading to false after receiving the response

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "FAQ Submitted!",
          text: "Your FAQ has been submitted successfully!",
        });

        console.log(data.faq); // Log the returned FAQ data
        setFormData({ name: "", email: "", faq: "" }); // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting FAQ. Please try again.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="faq-form-container">
        <h2>Submit a FAQ</h2>
        <form onSubmit={handleSubmit} className="faq-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="faq">FAQ:</label>
          <textarea
            id="faq"
            name="faq"
            value={formData.faq}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit FAQ"}
          </button>
        </form>

        {/* Show the spinner if loading */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div> {/* You can add a spinner here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqForm;
