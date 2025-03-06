import "./App.css";
import React from "react";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Categories from "./components/Categories";
import TopProducts from "./components/TopProducts";

const App = () => {
  return (
    <div className="bg-level-1 min-h-[100dvh] max-h-[100dvh] overflow-y-auto">
      <Header />
      <Slider />
      <Categories />
      <TopProducts />
    </div>
  );
};

export default App;
