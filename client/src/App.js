import React from "react";
import Home from "./pages/Home";
import GetPositionGetAlpacas from "./pages/GetPositionGetAlpacas";
import MapFixedCenter from "./pages/MapFixedCenter";
import MapWithStaticMarkers from "./pages/MapWithStaticMarkers";
import MapWithAlpacas from "./pages/MapWithAlpacas";
import Error from "./pages/Error";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> -{" "}
        <Link to="/get-position-get-alpacas">Get Position, Get Alpacas</Link> -{" "}
        <Link to="/map-fixed-center">Map Fixed Center</Link> -{" "}
        <Link to="/map-with-static-markers">Map with Static Markers</Link> -{" "}
        <Link to="/map-with-alpacas">Map with Alpacas</Link>
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
          <Route path="/map-fixed-center" element={<MapFixedCenter />} />
          <Route
            path="/map-with-static-markers"
            element={<MapWithStaticMarkers />}
          />
          <Route path="/map-with-alpacas" element={<MapWithAlpacas />} />
          <Route
            path="/get-position-get-alpacas"
            element={<GetPositionGetAlpacas />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <footer>Footer shared navigation</footer>
      </Router>
    </>
  );
}

export default App;
