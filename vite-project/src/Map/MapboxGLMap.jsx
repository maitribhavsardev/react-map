import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const styles = {
  width: "100vw", //https://itnext.io/viewport-units-the-css-you-didnt-know-about-but-should-24b104483429
  height: "100vh",
  top: 0,
  left: 0,
  position: "block",
};

export const MapboxGLMap = ({
  data,
  selectedId,
  colorBreaks,
  highlightLineColor = { rgba: [255, 102, 0, 1] },
  coordinates = [-119.846, 43.862],
  zoom = 6,
}) => {
  const mapContainer = useRef(null);
  const [statefulMap, setStatefulMap] = useState(null);

  const getFillColor = (colorBreaks) => {
    let fc = [];
    fc.push("step");
    fc.push(["get", "popsqmi"]);
    fc.push("rgba(0,0,0,0)");
    for (let colorBreak of colorBreaks) {
      fc.push(colorBreak.break);
      fc.push(
        `rgba(${colorBreak.rgba[0]}, ${colorBreak.rgba[1]}, ${colorBreak.rgba[2]},${colorBreak.rgba[3]})`
      );
    }

    return fc;
  };

  const initMap = () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw";

    const mapboxGlMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/light-v10`,
      center: coordinates,
      zoom: zoom,
    });

    mapboxGlMap.addControl(new mapboxgl.NavigationControl());
    mapboxGlMap.addControl(new mapboxgl.FullscreenControl());

    mapboxGlMap.on("load", () => {
      mapboxGlMap.addSource("aoi", {
        type: "geojson",
        data,
      });

      if (colorBreaks) {
        mapboxGlMap.addLayer({
          id: "aoi-solid-fill",
          source: "aoi",
          type: "fill",
          paint: { "fill-color": getFillColor(colorBreaks) },
        });
      }

      mapboxGlMap.addLayer({
        id: "aoi-solid-line",
        source: "aoi",
        type: "line",
        paint: { "line-color": "gray" },
      });

      //lay down a transparent highlight line layer, we'll use this layer later to highlight a feature based on selectedId
      mapboxGlMap.addLayer({
        id: "aoi-highlight",
        source: "aoi",
        type: "line",
        paint: {
          "line-color": `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]}, 0)`,
          "line-width": 4,
          "line-dasharray": [1, 1],
        },
      });

      setStatefulMap(mapboxGlMap);
    });
  };

  useEffect(() => {
    if (!statefulMap) {
      initMap();
    } else {
      if (selectedId) {
        statefulMap.setPaintProperty("aoi-highlight", "line-color", [
          "case",
          ["==", ["get", "id"], selectedId],
          `rgba(${highlightLineColor.rgba[0]},${highlightLineColor.rgba[1]},${highlightLineColor.rgba[2]},${highlightLineColor.rgba[3]})`,
          "rgba(0,0,0,0)",
        ]);
      } else {
        statefulMap.setPaintProperty(
          "aoi-highlight",
          "line-color",
          "rgba(0,0,0,0)"
        );
      }
    }
  }, [statefulMap, selectedId]);

  return <div style={styles} ref={mapContainer} />;
};
