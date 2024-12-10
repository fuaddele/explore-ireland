import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Make sure to install SweetAlert2
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { name, email, password } = formData;

  useEffect(() => {
    // Check if token exists and redirect if so
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/landing"); // Redirect if user is already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Store the token in localStorage
        localStorage.setItem("token", data.token); // assuming the token is in data.token
        // Redirect to the landing page or another page
        navigate("/landing"); // Adjust this route as necessary
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Registration failed!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="form-container">
      <h1>Join Us</h1>
      <p className="subheading">Create your account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account? <a href="/signin">Log In</a>
      </p>
    </div>
  );
};

export default SignUp;
