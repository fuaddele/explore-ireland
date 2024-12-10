import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/ReviewsPage.css";
import axios from "axios"; // Make sure axios is installed

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews from the API
        const response = await axios.get("http://localhost:5000/api/reviews");
        const fetchedReviews = response.data.reviews; // Access the reviews array in the response

        // Ensure that the fetched data is an array before setting it
        if (Array.isArray(fetchedReviews)) {
          setReviews(fetchedReviews);
        } else {
          console.error("Fetched data is not an array:", fetchedReviews);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  // Function to display stars based on rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${rating > index ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="reviews-container">
      <Navbar />
      <section className="reviews-section">
        <h2>Attraction Reviews</h2>
        <div className="reviews-list">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div className="review-card" key={index}>
                <h3>{review.title || "No title"}</h3>
                <p>{review.description || review.content}</p>
                <div className="rating">{renderStars(review.rating)}</div>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </section>
      {/* Add Review button */}
      <a href="/add_review">
        <button className="add-review-button">Add Review</button>
      </a>
    </div>
  );
};

export default ReviewsPage;
