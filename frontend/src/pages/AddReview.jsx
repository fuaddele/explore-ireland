import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Swal from "sweetalert2"; 
import Navbar from "./Navbar"; 
import "../css/AddReview.css";
import axios from "axios"; 

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [attractionName, setAttractionName] = useState("");
  const [content, setContent] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [title, setTitle] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate function
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/reviews`, {
        title,
        attractionName,
        content,
        rating,
        userEmail,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Review Submitted!",
          text: `You rated this attraction: ${"★".repeat(rating)}${"☆".repeat(5 - rating)}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/reviews"); // Redirect user after clicking OK
        });

        setAttractionName("");
        setContent("");
        setRating(0);
        setUserEmail("");
        setTitle("");
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
            id="content"
            placeholder="Write your review here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
                  onClick={() => setRating(star)}
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
