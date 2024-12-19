import React, { useState} from "react";
import { Outlet } from "react-router-dom";
import CategoriesNavBar from "../components/products/CategoriesNavBar.js";
import './styles/products.css';
import Search from '../components/products/Search.js';

const Products = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="products-page">
      <Search setSearchValue={setSearchValue}/>
      <Outlet context={searchValue}/>
      <CategoriesNavBar />
    </div>
  );
};

export default Products;
