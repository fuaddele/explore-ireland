import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/LandingPage.css";
import Navbar from "./Navbar";
import dublinZoo from "../assets/images/repro_free_dublin_zoo_09.webp";
import guinnessStorehouse from "../assets/images/GuinnessBrewerygate_Guinnesss_storehouse.jpg";
import nationalGallery from "../assets/images/grand-gallery-national-gallery-of-ireland.jpg";
import trinityCollege from "../assets/images/trinity-college.jpg";
import phoenixPark from "../assets/images/phoenix-park.jpg";
import galwayCathedral from "../assets/images/galway-cathedral.jpg"; // Import new image

const LandingPage = () => {
  const navigate = useNavigate();
  
  // Protect Landing Page: Redirect unauthenticated users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup"); // Redirect if user is not logged in
    }
  }, [navigate]);

  // Featured attractions with proper links
  const [featuredAttractions] = useState([
    {
      name: "Guinness Storehouse",
      image: guinnessStorehouse,
      description:
        "Explore the story of Guinness and enjoy panoramic views of Dublin.",
      link: "/attractions/guinness-storehouse",
    },
    {
      name: "Dublin Zoo",
      image: dublinZoo,
      description:
        "Discover exotic animals and lush landscapes in one of Europe's oldest zoos.",
      link: "/attractions/dublin-zoo",
    },
    {
      name: "National Gallery of Ireland",
      image: nationalGallery,
      description: "Marvel at Irish and European art in this stunning gallery.",
      link: "/attractions/national-gallery",
    },
    {
      name: "Trinity College",
      image: trinityCollege,
      description:
        "Visit the historic campus and see the world-famous Book of Kells.",
      link: "/attractions/trinity-college",
    },
    {
      name: "Phoenix Park",
      image: phoenixPark,
      description: "Relax in one of the largest walled city parks in Europe.",
      link: "/attractions/phoenix-park",
    },
    {
      name: "Galway Cathedral",
      image: galwayCathedral,
      description:
        "Experience the grandeur of one of Galway’s most iconic landmarks.",
      link: "/attractions/galway-cathedral",
    },
  ]);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Title */}
      <header className="main-title">
        <h1>Explore Ireland</h1>
        <p>Discover some of the best attractions Ireland has to offer</p>
      </header>

      {/* Featured Attractions Section */}
      <section className="featured-attractions">
        <h2>Featured Attractions</h2>

        <div className="attractions-grid">
          {featuredAttractions.map((attraction, index) => (
            <div
              key={index}
              className="attraction-card"
              onClick={() => attraction.link && navigate(attraction.link)}
            >
              <img
                src={attraction.image}
                alt={attraction.name}
                className="small-image"
              />
              <h3>{attraction.name}</h3>
              <p>{attraction.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
