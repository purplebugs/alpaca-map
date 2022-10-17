// Ref: https://github.com/googlemaps/react-wrapper/blob/main/examples/basic.tsx

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function MyMapComponent({ center, zoom }) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}

const MapFixedCenter = () => {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <>
      <h2>Example simple map that renders with fixed centre location</h2>
      <Wrapper apiKey="AIzaSyA4CRGK7nl21aBT_1uzNgLZ0B2SyAyd__E" render={render}>
        <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
    </>
  );
};

export default MapFixedCenter;
