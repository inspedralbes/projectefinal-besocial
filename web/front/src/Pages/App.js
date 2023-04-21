import React from "react";
import FilterMap from "../Components/FilterMap";
import Header from "../Components/Header";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';


export default function App() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <FilterMap />
      </div>
    </>
  );
}
