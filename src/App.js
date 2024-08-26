import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/404.js";
import ProductsList from "./components/ProductsList.js";
import CartPage from './pages/CartPage.js';
import Login from './pages/Login.js';
import SignUp from './pages/SignUp.js';
import Footer from "./components/Footer.js";
import ProductPage from "./pages/ProductPage.js";


const App = () => {

  return (
    <>
     
      <Header />


      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}>
          <Route path="clothes" element={<ProductsList category={'Clothes'}/>} />
          <Route path="electronics" element={<ProductsList category={'Electronics'}/>} />
          <Route path="furniture" element={<ProductsList category={'Furniture'}/>} />
          <Route path="shoes" element={<ProductsList category={'Shoes'}/>} />
          <Route path="miscellaneous" element={<ProductsList category={'Miscellaneous'}/>} />
          <Route path="all-products" element={<ProductsList category={'all-products'} />}/>
          <Route path="" element={<ProductsList category={'all-products'} />}/>
        </Route>
        <Route path="/product-page/:id" element={<ProductPage />}/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login /> }/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/my-cart" element={<CartPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
