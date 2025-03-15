import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/ReviewsPage.css";
import axios from "axios";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [newContent, setNewContent] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;
  const loggedInUserId = localStorage.getItem("userId"); // Get user ID from localStorage

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reviews`);
        setReviews(response.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  const handleEdit = (review) => {
    setEditingReview(review);
    setNewContent(review.content);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/reviews/${editingReview._id}`, {
        content: newContent,
      });

      setReviews(reviews.map(r => (r._id === editingReview._id ? { ...r, content: newContent } : r)));
      setEditingReview(null);
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`${API_URL}/api/reviews/${id}`);
        setReviews(reviews.filter((r) => r._id !== id));
      } catch (err) {
        console.error("Error deleting review:", err);
      }
    }
  };

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
            reviews.map((review) => (
              <div className="review-card" key={review._id}>
                <h3>{review.title || "No title"}</h3>
                {editingReview && editingReview._id === review._id ? (
                  <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                ) : (
                  <p>{review.content}</p>
                )}
                <div className="rating">{renderStars(review.rating)}</div>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>

                {/* Check if logged-in user is the review owner */}
                {loggedInUserId && loggedInUserId === review.user?._id && (
                  <div className="review-actions">
                    {editingReview && editingReview._id === review._id ? (
                      <>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingReview(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(review)}>Edit</button>
                        <button onClick={() => handleDelete(review._id)}>Delete</button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </section>
      <a href="/add_review">
        <button className="add-review-button">Add Review</button>
      </a>
    </div>
  );
};

export default ReviewsPage;
