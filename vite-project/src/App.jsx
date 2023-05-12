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

function App() {
  const [count, setCount] = useState(0);

  const options = {
    view: {
      center: [15, 65],
      zoom: 4,
    },
  };

  const [ref] = useWebMap("e691172598f04ea8881cd2a4adaa45ba", options);

  return (
    <>
      <h1>React-arcgis</h1>
      <div style={{ height: 400 }} ref={ref} />
      {/* <div style={{ height: 400 }} ref={reference} /> */}
    </>
  );
}

export default App;
