import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { name, email, password } = formData;

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

  const validateInputs = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!nameRegex.test(name)) newErrors.name = "Name must be at least 3 characters long.";
    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
          confirmButtonText: "OK",
        });

        localStorage.setItem("token", data.token);
        navigate("/landing");
      } else {
        switch (response.status) {
          case 400:
            Swal.fire({ title: "Error!", text: data.message || "Invalid input!", icon: "error" });
            break;
          case 409:
            Swal.fire({
              title: "Error!",
              text: "This email is already registered. Try logging in instead.",
              icon: "error",
              confirmButtonText: "OK",
            });
            break;
          case 500:
            Swal.fire({ title: "Server Error!", text: "Something went wrong. Try again later.", icon: "error" });
            break;
          default:
            Swal.fire({ title: "Error!", text: data.message || "Registration failed!", icon: "error" });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
            className={errors.name ? "error-input" : ""}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
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
