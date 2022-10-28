import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> -{" "}
        <Link to="/map-with-alpacas">Map with Alpacas</Link>
      </nav>
    </>
  );
};

export default Nav;
