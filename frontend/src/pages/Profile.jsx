import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";
import dp from "../assets/images/avatar-659651_640.webp";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found, please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status code ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched user data:", data); // Debugging line
        setUser(data);
      } catch (error) {
        console.error("Failed to load profile information:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const getProfilePictureUrl = (profilePicture) => {
    // Check if there's a profile picture and if it's a valid URL
    if (profilePicture) {
      // If it's a relative path, prepend the base URL
      return profilePicture.startsWith("http")
        ? profilePicture
        : `http://localhost:5000/${profilePicture.replace(/\\/g, "/")}`;
    }
    // If no profile picture, return the default image
    return dp;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-section">
        <div className="profile-card">
          <img
            src={getProfilePictureUrl(user?.profilePicture)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150";
            }}
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            <h3>{user.name}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Member Since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <button
              className="btn edit-profile-btn"
              onClick={() => user && navigate(`/update-profile/${user._id}`)}
              disabled={!user} // Disable button if user is null
            >
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
