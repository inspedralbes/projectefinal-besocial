import React from "react";
import Map from "../Components/Map";
import Header from "../Components/Header";
import Filter from "../Components/Filter";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Map />
      </div>
      <Filter />
    </>
  );
}

export default App;
