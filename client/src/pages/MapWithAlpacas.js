import React, {
  useState,
  useEffect,
  useRef,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

const render = (status) => {
  return <h1>{status}</h1>;
};

const AlpacaMap = (props) => {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: props.center,
          zoom: props.zoom,
        })
      );
    }
  }, [ref, map]);

  return (
    <>
      <div ref={ref} id="map" />

      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (props) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(props); // setOptions is part of Google API to set options on a marker
    }
  }, [marker, props]);
  return null;
};

const MapWithAlpacas = () => {
  const [data, setData] = useState(null);
  const center = { lat: 59, lng: 20 };
  const label = "Alpaca";
  const zoom = 4;
  const alpacaFarms = new Map(); // cache locations to avoid duplicate lookup of Google API

  const getData = async () => {
    const response = await fetch("/api/all?size=150");
    const items = await response.json();
    setData(items);
    console.log("items", items);
  };

  useEffect(() => {
    getData();
  }, []);

  const extractLocations = (listOfAlpacas) => {
    const myOutput = [];
    for (const alpaca of listOfAlpacas) {
      // TODO cache so don't process duplicates
      if (
        alpaca._source &&
        alpaca.location &&
        alpaca.location.coordinates &&
        alpaca.location.coordinates[0] !== null &&
        alpaca.location.coordinates[1] !== null &&
        alpaca.location.coordinates[0] !== undefined &&
        alpaca.location.coordinates[1] !== undefined
      ) {
        const lat = alpaca.location.coordinates[1];
        const lng = alpaca.location.coordinates[0];

        const key = `${lat}:${lng}`;
        // Add farm position
        const position = {
          lat: lat,
          lng: lng,
        };

        if (alpacaFarms.has(key)) {
          // console.log(`[LOG] Using location from alpacaFarms: ${key}`);
          // Do not add new farm
        } else {
          // Add new farm
          myOutput.push(position);
          alpacaFarms.set(key, position);
          // console.log(`[LOG] Location added to alpacaFarms: ${key}`);
        }
      }
    }
    return myOutput;
  };

  const AlpacaMarker = (data) => {
    const locations = extractLocations(data);

    const result = locations.map((location, id) => {
      return <Marker key={id} position={location} label={label} />;
    });
    return result;
  };

  return (
    <>
      <header>
        <h2>Map with alpaca locations</h2>
      </header>
      <section>
        <p>Placeholder to show alpaca details</p>
        <p>and more info</p>
      </section>
      <Wrapper
        apiKey={"AIzaSyA4CRGK7nl21aBT_1uzNgLZ0B2SyAyd__E"}
        render={render}
      >
        <AlpacaMap center={center} zoom={zoom}>
          {!data ? "Loading..." : AlpacaMarker(data)}
        </AlpacaMap>
      </Wrapper>
    </>
  );
};

export default MapWithAlpacas;
