import React from "react";
import Home from "./pages/Home";
import MapWithAlpacas from "./pages/MapWithAlpacas";
import Error from "./pages/Error";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> -{" "}
        <Link to="/map-with-alpacas">Map with Alpacas</Link>
        <Link to="/testing">Testing link</Link>
      </nav>
    </>
  );
};

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map-with-alpacas" element={<MapWithAlpacas />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <footer>Footer shared navigation</footer>
      </Router>
    </>
  );
}

export default App;
