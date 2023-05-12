import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { Scene, Map } from "@esri/react-arcgis";
// import { WebMap, WebScene } from "@esri/react-arcgis";
// import { useWebMap } from "esri-loader-hooks";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* <div style={{ width: "100vw", height: "100vh" }}>
      <WebMap id="6627e1dd5f594160ac60f9dfc411673f" />
      <WebScene id="f8aa0c25485a40a1ada1e4b600522681" />
    </div> */}
    {/* <Map class="full-screen-map" mapProperties={{ basemap: "satellite" }} /> */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);

// ReactDOM.render(<Map />, document.getElementById("container"));
