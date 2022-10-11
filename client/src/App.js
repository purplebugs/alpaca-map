import React from "react";
import "./App.css";
import Home from "./pages/Home";
import AlpacaMap from "./pages/AlpacaMap";
import Error from "./pages/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>Top shared navigation</nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alpaca-map" element={<AlpacaMap />} />
          <Route path="/testing" element={<div>testing</div>} />
          <Route path="*" element={<Error />} />
        </Routes>
        <footer>Footer shared navigation</footer>
      </BrowserRouter>
    </>
  );
}

export default App;
