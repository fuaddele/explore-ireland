import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = formData;

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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        // Redirect to the landing page or another page
        navigate("/landing"); // Adjust this route as necessary
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Login failed!",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
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
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
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
          Log In
        </button>
      </form>
      <p className="login-link">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;
