import React from "react";
import { Routes, Route } from "react-router-dom";

//hooks
import useCategories from "./hooks/useCategories.js";

//pages
import LandingPage from "./pages/LandingPage.js";
import Products from "./pages/Products";
import About from "./pages/About";
import CartPage from "./pages/CartPage.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Logout from "./pages/Logout.js";
import ProductPage from "./pages/ProductPage.js";
import MyOrders from "./pages/MyOrders.js";
import OrderDetail from "./pages/OrderDetail.js";
import InfoPage from "./pages/InfoPage.js";

//components
import Header from "./components/utils/Header.js";
import ProtectedRoute from "./components/utils/ProtectedRoute.js";
import Footer from "./components/utils/Footer.js";
import ProductsList from "./components/products/ProductsList.js";

const App = () => {
  const { categories } = useCategories();

  
  return (
    <>
      <Header />

      <Routes>
        <Route key={"home"} path="/" element={<LandingPage />} />
        <Route key={"products"} path="/products" element={<Products />}>
          <Route
            key={"all"}
            path="all-products"
            element={<ProductsList category={"all-products"} />}
          />
          {categories &&
            categories.map(({ name }) => (
              <Route
                key={name}
                path={name}
                element={<ProductsList category={name} />}
              />
            ))}
        </Route>

        <Route
          key={"myOrders"}
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          key={"order-detail"}
          path="/orders/:id"
          element={<OrderDetail />}
        />
        <Route
          key={"product-page"}
          path="/product-page/:id"
          element={<ProductPage />}
        />
        <Route key={"about"} path="/about" element={<About />} />
        <Route key={"login"} path="/login" element={<Login />} />
        <Route key={"logout"} path="/logout" element={<Logout />} />
        <Route key={"signup"} path="/signup" element={<SignUp />} />
        <Route key={"my-cart"} path="/my-cart" element={<CartPage />} />
        <Route
          key={"success"}
          path="/success"
          element={
            <InfoPage message={"Payment Successful!"} url="/my-orders" />
          }
        />
        <Route
          key={"canceled"}
          path="/cancel"
          element={<InfoPage message={"Payment Canceled!"} url="/my-cart" />}
        />
        <Route
          key={"not-found"}
          path="*"
          element={<InfoPage message={"Page not Found :("} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
