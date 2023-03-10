import React from "react";
import FilterMap from "../Components/FilterMap";
import Header from "../Components/Header";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <>
      <div className="App">
        <Header />
        <FilterMap />
      </div>
    </>
  );
}

export default App;
