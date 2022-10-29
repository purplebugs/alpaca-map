import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <header>
        <p>{!data ? "Loading..." : data}</p>
        <Link to="/testing">Testing link</Link>
      </header>
      <main></main>
    </>
  );
};
export default Home;
