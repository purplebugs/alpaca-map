import React from "react";
import "./AlpacaMap.css";

const AlpacaMap = () => {
  const [data, setData] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);

  const getData = async () => {
    const response = await fetch("/api/all?size=150");
    const items = await response.json();
    setData(items);
    console.log("items", items);
  };

  /*   const getGeoPosition = () => {
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

  React.useEffect(() => {
    // this is a wrapper allowing an async call
    async function loadPosition() {
      return await getGeoPosition();
    }
    const position = loadPosition();
    console.log("position", position);
  }, []);
 */
  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
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
          {!latitude ? "Loading latitude..." : latitude}:
          {!longitude ? "Loading longitude..." : longitude}
        </section>
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
