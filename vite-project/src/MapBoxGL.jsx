import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const MapboxGL = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.59);
  const [lat, setLat] = useState(23.01);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <>
      <h1>MapBox GL</h1>
      <div>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div
          style={{ height: "400px" }}
          ref={mapContainer}
          className="map-container"
        />
      </div>
    </>
  );
};

export default MapboxGL;
