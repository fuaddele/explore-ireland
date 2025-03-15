import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const API_URL = import.meta.env.VITE_API_URL; // Get API URL from environment variables

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/faqs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Query Submitted!",
          text: "Your Query has been submitted successfully!",
        }).then(() => {
          navigate("/faq"); // Redirect to FAQ page after confirmation
        });

        setFormData({ name: "", email: "", faq: "" }); // Reset the form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error submitting Query. Please try again.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="faq-form-container">
        <h2>Submit a Query</h2>
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

          <label htmlFor="faq">Query:</label>
          <textarea
            id="faq"
            name="faq"
            value={formData.faq}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Query"}
          </button>
        </form>

        {/* Show the spinner if loading */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqForm;
