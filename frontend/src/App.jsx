import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import Category from "./pages/Category";
import Sessions from "./pages/Sessions";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import authStore from "./store/authStore";
import SecureRoute from "./components/SecureRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import Controll from "./pages/Controll";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { user, getUser, loading } = authStore();
  console.log(user);
  useEffect(() => {
    getUser();
  }, [getUser]);
  if (loading) return <Loader />;
  return (
    <Router>
      <div className="bg-level-1 min-h-[100dvh] max-h-[100dvh] overflow-y-auto">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route
            path="/cart"
            element={
              <SecureRoute>
                <Cart />
              </SecureRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <SecureRoute>
                <Wishlist />
              </SecureRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <SecureRoute>
                <Orders />
              </SecureRoute>
            }
          />
          <Route path="/category/:id" element={<Category />} />
          <Route
            path="/sessions"
            element={
              <SecureRoute>
                <Sessions />
              </SecureRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <SecureRoute>
                <Admin />
              </SecureRoute>
            }
          />
          <Route path="/admin/control" element={<Controll />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/payment/success"
            element={
              <SecureRoute>
                <PaymentSuccess />
              </SecureRoute>
            }
          />
          <Route
            path="/payment/fail"
            element={
              <SecureRoute>
                <PaymentFail />
              </SecureRoute>
            }
          />
        </Routes>
        <Footer />
        <div>
          <Toaster
            toastOptions={{
              className: "",
              // style: {
              //   background: "red",
              // },
            }}
            position="bottom-left"
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
