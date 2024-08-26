import React, { useState} from "react";
import { Outlet } from "react-router-dom";
import CategoriesNavBar from "../components/CategoriesNavBar";
import './styles/products.css';
import Search from '../components/Search';

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
