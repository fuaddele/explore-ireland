import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import IrelandMap from "./pages/IrelandMap";
import AddReview from "./pages/AddReview";
import ReviewsPage from "./pages/ReviewsPage";
import FAQPage from "./pages/FAQPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Faq from "./pages/Faq";
import FaqForm from "./pages/FaqForm"; // Import the FAQ form component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/add_review" element={<AddReview />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/update-profile/:id" element={<EditProfile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/map" element={<IrelandMap />} />
        <Route path="/add-faq" element={<FaqForm />} />{" "}
        {/* Add FAQ form route */}
      </Routes>
    </Router>
  );
}

export default App;
