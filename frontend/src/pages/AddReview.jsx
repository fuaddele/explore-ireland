import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import Navbar from "./Navbar"; // Import the Navbar component
import "../css/AddReview.css";
import axios from "axios"; // Import axios for API requests

const AddReview = () => {
  const [rating, setRating] = useState(0); // State for storing rating value
  const [attractionName, setAttractionName] = useState(""); // State for attraction name
  const [content, setContent] = useState(""); // Rename description to content
  const [userEmail, setUserEmail] = useState(""); // State for user email
  const [title, setTitle] = useState(""); // State for review title

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the backend with title and content (now content)
      const response = await axios.post("http://localhost:5000/api/reviews", {
        title, // Include title
        attractionName,
        content, // Content field is now the renamed content
        rating,
        userEmail, // Include email in the request body
      });

      // Check if the response is successful
      if (response.status === 201) {
        // Show SweetAlert confirmation
        Swal.fire({
          title: "Review Submitted!",
          text: `You rated this attraction: ${"★".repeat(rating)}${"☆".repeat(
            5 - rating
          )}`,
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset form fields
        setAttractionName("");
        setContent(""); // Reset content field
        setRating(0);
        setUserEmail(""); // Reset email field
        setTitle(""); // Reset title field
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit review. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error submitting review:", err);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="container">
      <Navbar />
      <section className="add-review">
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Review Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter review title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="attraction">Attraction Name:</label>
          <input
            type="text"
            id="attraction"
            placeholder="Enter attraction name"
            value={attractionName}
            onChange={(e) => setAttractionName(e.target.value)}
            required
          />

          <label htmlFor="content">Your Review:</label>
          <textarea
            id="content" // Changed the ID from "review" to "content"
            placeholder="Write your review here..."
            value={content}
            onChange={(e) => setContent(e.target.value)} // Use content instead of description
            required
          ></textarea>

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />

          <div className="rating-section">
            <p>Rate the Attraction:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${rating >= star ? "filled" : ""}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </section>
    </div>
  );
};

export default AddReview;
