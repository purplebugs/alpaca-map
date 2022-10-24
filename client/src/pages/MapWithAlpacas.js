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
  }, [ref, map, props.center, props.zoom]);

  return (
    <>
      <div ref={ref} id="map" />

      {Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          // set the map prop on the child component
          // Ref: https://developers.google.com/maps/documentation/javascript/react-map#marker-child-component
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

const MapWithAlpacas = () => {
  const [data, setData] = useState(null);
  const [farmInfo, setFarmInfo] = useState(null);
  const center = { lat: 61, lng: 12 };
  const zoom = 5;
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
      if (
        alpaca &&
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
          console.log(`[LOG] Using location from alpacaFarms: ${key}`);
          // Do not add new farm
        } else {
          // Add new farm
          myOutput.push(position);
          alpacaFarms.set(key, position);
          console.log(`[LOG] Location added to alpacaFarms: ${key}`);
        }
      }
    }
    return myOutput;
  };

  const Marker = (options) => {
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
      let listenerHandle = null;
      if (marker) {
        listenerHandle = marker.addListener("click", () => {
          console.log(`Farm position: ${JSON.stringify(options.position)}`);
          setFarmInfo(options.position);
        });
        marker.setOptions(options); // setOptions is part of Google API to set options on a marker
        console.log("options", options);
      }
      return () => {
        if (marker) {
          listenerHandle.remove();
        }
      };
    }, [marker, options]);
    return null;
  };

  const AlpacaMarker = (data) => {
    const locations = extractLocations(data);

    const result = locations.map((location, id) => {
      return (
        <Marker
          key={id}
          position={location}
          label={`${id + 1}. Alpaca farm`}
          optimized={false}
        />
      );
    });
    return result;
  };

  const InfoSection = () => {
    return (
      <>
        <section>
          <p>Farm info</p>

          <ul>
            <li>
              {!farmInfo
                ? "Click map marker, or use spacebar or enter when selected to show info"
                : JSON.stringify(farmInfo)}
            </li>
          </ul>
        </section>
      </>
    );
  };

  return (
    <>
      <header>
        <h2>Map with alpaca locations</h2>
      </header>
      <section>
        <p>Placeholder to show alpaca details</p>

        <p>The alpacas on the map are accessible for screen readers </p>
        <ul>
          <li>
            Use tab to select first marker, arrows to move between markers
          </li>
          <li>Use spacebar or enter to show info</li>
        </ul>
      </section>
      <InfoSection />
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
