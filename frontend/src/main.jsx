import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import the App component
import "./index.css"; // Optional: for global styles

// Create root element and render the App component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
