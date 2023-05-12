import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  useWebMap,
  useFeatureTable,
  useMap,
  useGraphics,
} from "esri-loader-hooks";
import MapboxGL from "./MapBoxGL";
import { MapboxGLMap } from "./Map/MapboxGLMap";
import { BarPlot } from "./BarPlot/BarPlot";
import { oregon_county_pop_data } from "./Data/data";
import { oregon_county_pop_geo_data } from "./Data/data";
import { color_breaks } from "./Data/data";

function App() {
  const [count, setCount] = useState(0);

  const [selectedId, setSelectedId] = useState(null);
  const [ref] = useWebMap("e691172598f04ea8881cd2a4adaa45ba");

  return (
    <>
      <h1>React-arcgis</h1>
      <div style={{ height: 400 }} ref={ref} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div style={{ height: 400 }} ref={reference} /> */}

      <MapboxGL />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>Map Box Integration With D3</h1>
      <div>
        {" "}
        <div>
          {" "}
          <BarPlot
            data={oregon_county_pop_data()}
            svgWidth={450}
            svgHeight={275}
            itemDelay={200}
            onSelectItem={setSelectedId}
            colorBreaks={color_breaks()}
            highlightLineColor={{ rgba: [255, 102, 0, 1] }}
            tiltXLabels={true}
            visualizationTitle="Oregon Counties Population Density"
            leftAxisTitle="Persons Per Square Mile"
            bottomAxisTitle="County"
          />{" "}
        </div>{" "}
        <div>
          {" "}
          <MapboxGLMap
            data={oregon_county_pop_geo_data()}
            colorBreaks={color_breaks()}
            highlightLineColor={{ rgba: [255, 102, 0, 1] }}
            coordinates={[-119.846, 43.862]}
            zoom={6}
            selectedId={selectedId}
          />{" "}
        </div>{" "}
      </div>
    </>
  );
}

export default App;
