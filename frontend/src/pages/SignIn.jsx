import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formData;

  // Redirect if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/landing");
    }
  }, [navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validate inputs on submission
  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes (clear errors when user types)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        });

        localStorage.setItem("token", data.token);
        navigate("/landing");
      } else {
        switch (response.status) {
          case 401:
            Swal.fire({ title: "Error!", text: "Incorrect email or password!", icon: "error" });
            break;
          case 500:
            Swal.fire({ title: "Server Error!", text: "Something went wrong. Try again later.", icon: "error" });
            break;
          default:
            Swal.fire({ title: "Error!", text: data.message || "Login failed!", icon: "error" });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Error!",
        text: "Network error. Please check your internet connection.",
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
            className={errors.email ? "error-input" : ""}
            required
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
              required
            />
            <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}
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
