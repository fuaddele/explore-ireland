import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import "../css/EditProfile.css";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (profilePicture) {
      formData.append("profilePic", profilePicture);
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.updated) {
        setUser(response.data.user);
        setMessage(response.data.message);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: response.data.message,
        });
      } else {
        setMessage("No changes were made to the profile.");
      }
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update profile");
      setMessage(null);
    }
  };

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

  // Construct the profile picture URL
  const profilePictureUrl = user?.profilePicture
    ? user.profilePicture.startsWith("http") // Check if it's already a full URL
      ? user.profilePicture // If it's a full URL, use it directly
      : `http://localhost:5000/${user.profilePicture}` // Otherwise, prepend the base URL
    : "https://via.placeholder.com/150"; // Placeholder image URL

  if (loading) return <div>Loading...</div>;
  if (error && !user) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-profile-page">
      <Navbar />
      <main className="edit-profile-section">
        <h2>Edit Profile</h2>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleProfileUpdate}>
          <div>
            <label>Profile Picture:</label>
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="profile-picture"
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
                clearMessages();
              }}
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearMessages();
              }}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearMessages();
              }}
              required
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
