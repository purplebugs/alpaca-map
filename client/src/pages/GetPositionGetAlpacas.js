import React from "react";

const getGeoPosition = () => {
  return new Promise((resolve, reject) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API
    // Wrap navigator.geolocation browser API in a promise because it returns asynchronously
    // however was written before Promises, therefore it does not return a Promise
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const GetPositionGetAlpacas = () => {
  const [data, setData] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);

  const getData = async () => {
    const response = await fetch("/api/all?size=150");
    const items = await response.json();
    setData(items);
    console.log("items", items);
  };

  React.useEffect(() => {
    // this is a wrapper allowing an async call
    async function loadPosition() {
      const position = await getGeoPosition();
      setLatitude(position.lat);
      setLongitude(position.lng);
      console.log("position", position);
    }
    loadPosition();
  }, []);

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
        <h2>Show current position:</h2>
        <section>
          {!latitude ? "Loading latitude..." : latitude}:
          {!longitude ? "Loading longitude..." : longitude}
        </section>
        <h2>Show list of alpacas from the API:</h2>

        <section>{!data ? "Loading..." : AlpacaList(data)}</section>
      </header>
    </div>
  );
};

export default GetPositionGetAlpacas;
