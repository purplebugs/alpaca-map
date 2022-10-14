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

const MapWithStaticMarkers = () => {
  const center = { lat: -34.397, lng: 150.644 };
  const centeranother = { lat: -10.397, lng: 150.644 };
  const label = "My location 12237843278423";
  const zoom = 4;

  return (
    <>
      <h2>Example! simple map that renders with two fixed markers</h2>

      <Wrapper
        apiKey={"AIzaSyA4CRGK7nl21aBT_1uzNgLZ0B2SyAyd__E"}
        render={render}
      >
        <Map center={center} zoom={zoom}>
          <Marker position={center} label={label} />
          <Marker position={centeranother} />
        </Map>
      </Wrapper>
    </>
  );
};

export default MapWithStaticMarkers;
