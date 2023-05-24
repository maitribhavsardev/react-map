import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
// import Legend from "./components/Legend";
import Optionsfield from "./Optionsfield";
import "./Map.css";
import data from "./data.json";
import { BarPlot } from "./BarPlot/BarPlot";
import { color_breaks, oregon_county_pop_data } from "./Data/data";

// mapboxgl.accessToken =
//   'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA'
mapboxgl.accessToken =
  "pk.eyJ1Ijoid2lsbGNhcnRlciIsImEiOiJjamV4b2g3Z2ExOGF4MzFwN3R1dHJ3d2J4In0.Ti-hnuBH8W4bHn7k6GCpGw";

const Map = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [statefulMap, setStatefulMap] = useState(null);

  const options = [
    {
      name: "Population",
      description: "Estimated total population",
      property: "pop_est",
      stops: [
        [0, "#f8d5cc"],
        [1000000, "#f4bfb6"],
        [5000000, "#f1a8a5"],
        [10000000, "#ee8f9a"],
        [50000000, "#ec739b"],
        [100000000, "#dd5ca8"],
        [250000000, "#c44cc0"],
        [500000000, "#9f43d7"],
        [1000000000, "#6e40e6"],
      ],
    },
    {
      name: "GDP",
      description: "Estimate total GDP in millions of dollars",
      property: "gdp_md_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
  ];
  const mapContainerRef = useRef(null);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      selectedId,
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [5, 34],
      zoom: 1.5,
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data,
      });

      map.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      setMap(map);
      setStatefulMap(map);
    });

    console.log(
      "106",
      `selectedId is not null, highlight selected country name: ${selectedId}`
    );
    // Clean up on unmount
    return () => map.remove();
  }, [selectedId]);

  useEffect(() => {
    paint();
  }, [active]);

  const paint = () => {
    if (map) {
      map.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });
    }
  };

  const changeState = (i) => {
    setActive(options[i]);
    map.setPaintProperty("countries", "fill-color", {
      property: active.property,
      stops: active.stops,
    });
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      {/* <Legend active={active} stops={active.stops} /> */}
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />

      <BarPlot
        data={oregon_county_pop_data()}
        svgWidth={450}
        svgHeight={275}
        itemDelay={200}
        onSelectItem={setSelectedId}
        colorBreaks={color_breaks()}
        highlightLineColor={{ rgba: [255, 102, 0, 1] }}
        tiltXLabels={true}
        visualizationTitle="Counties Population "
        leftAxisTitle="Count"
        bottomAxisTitle="County"
      />
    </div>
  );
};

export default Map;
