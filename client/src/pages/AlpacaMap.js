import React from "react";

const AlpacaMap = () => {
  const [data, setData] = React.useState(null);

  const getData = async () => {
    const response = await fetch("/api/all?size=150");
    const items = await response.json();
    setData(items);
    console.log(items);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const AlpacaList = (data) => {
    return (
      <section>
        {data.map((alpaca, id) => {
          return (
            <article key={alpaca._source.alpacaId}>
              <h3>
                {id} - Alpaca Name: {alpaca._source.alpacaShortName}
              </h3>
              <h6>Gender: {alpaca._source.gender}</h6>
              <h6>Farm: {alpaca._source.name}</h6>
            </article>
          );
        })}
      </section>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <section>
          Map TODO - currently this page only shows a list of alpacas from the
          API:
        </section>

        <section>{!data ? "Loading..." : AlpacaList(data)}</section>
      </header>
    </div>
  );
};

export default AlpacaMap;
