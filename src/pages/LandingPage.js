import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../hooks/useCategories";
import "./styles/landingPage.css"; 


const LandingPage = () => {
  const { categories } = useCategories();

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Goldis</h1>
        <p>Your ultimate destination for stylish and affordable fashion!</p>
      </header>
      <div className="categories-container">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>
            <Link to={`/products/${category.name}`}>
              <img src={category.image} alt={`${category.name} category`} />
              <h2>{category.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
