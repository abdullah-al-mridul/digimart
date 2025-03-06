import "./App.css";
import React from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Categories from "./components/Categories";
import TopProducts from "./components/TopProducts";
import SecurePayment from "./components/SecurePayment";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
const App = () => {
  return (
    <Router>
      <div className="bg-level-1 min-h-[100dvh] max-h-[100dvh] overflow-y-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="*" element={<NotFound />} /> 404 Route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
