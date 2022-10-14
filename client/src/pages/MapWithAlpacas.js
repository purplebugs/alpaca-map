import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  return <h1>{status}</h1>;
};

const Map = (props) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
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

      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker = (props) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(props); // setOptions is part of Google API to set options on a marker
    }
  }, [marker, props]);
  return null;
};

const MapWithAlpacas = () => {
  const [data, setData] = React.useState(null);
  const center = { lat: 59, lng: 20 };
  const label = "Alpaca";
  const zoom = 4;

  const getData = async () => {
    const response = await fetch("/api/all?size=150");
    const items = await response.json();
    setData(items);
    // console.log("items", items);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const AlpacaMarker = (data) => {
    const result = data.map((alpaca, id) => {
      // TODO cache so don't process duplicates
      if (
        alpaca._source &&
        alpaca._source.location &&
        alpaca._source.location.coordinates &&
        alpaca._source.location.coordinates[0] !== null
      ) {
        const lat = alpaca._source.location.coordinates[1];
        const lng = alpaca._source.location.coordinates[0];

        const position = {
          lat: lat,
          lng: lng,
        };

        // console.log("position", position);
        return <Marker key={id} position={position} label={label} />;
      }
    });
    return result;
  };

  return (
    <>
      <h2>IN PROGRESS: Map with alpaca locations</h2>

      <Wrapper
        apiKey={"AIzaSyA4CRGK7nl21aBT_1uzNgLZ0B2SyAyd__E"}
        render={render}
      >
        (
        <Map center={center} zoom={zoom}>
          {!data ? "Loading..." : AlpacaMarker(data)}
        </Map>
      </Wrapper>
    </>
  );
};

export default MapWithAlpacas;
