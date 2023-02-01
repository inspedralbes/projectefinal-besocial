import React from "react";
import Map from "../Components/Map";
import Header from "../Components/Header";
import "./style.css";
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Map />
    </div>
  );
}

export default App;