import React from "react";
import { NavLink } from "react-router-dom";
import useCategories from "../../hooks/useCategories.js";

const CategoriesNavBar = () => {
  const { loading, error, categories } = useCategories();

  return (
    <ul className="categories-navbar">
      {!loading &&
        !error && (<>
        <li key={'all'}>
            <NavLink  to={'all-products'}>All</NavLink>
        </li>
        {categories.map(({ name }) => (
            <li key={name}>
              <NavLink to={name}>{name}</NavLink>
            </li>
          ))}</>)
        }
    </ul>
  );
};

export default CategoriesNavBar;
