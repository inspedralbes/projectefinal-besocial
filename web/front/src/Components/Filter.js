import React, { useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import filtericon from "./filter.svg";
// import { useMap } from "react-leaflet";
import { useState } from "react";

export default function Filter() {
  const L = window.L;
  const [center, setCenter] = useState([41.8375, 1.53778]);

  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  let fechaHoy = year + "-" + month + "-" + day;

  setInterval(function () {
    var slider = document.getElementById("distancia");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function () {
      output.innerHTML = this.value;
    };
  }, 1000);


  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      });
    }
  };

  useEffect(() => {
    getCoords();
  }, []);

  function calcDistance(){
    let centerLatLng = L.latLng(center[0], center[1]); 
    let distancia = centerLatLng.distanceTo()
    console.log(distancia);
  }

  return (
    <div className="filtersContainer">
      <img src={filtericon} alt="filter icon" width={50} />
      <form action="#">
        <div className="searchbyName">
          <label for="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Nombre del evento o local"
          />
        </div>

        <div className="searchbyDate">
          <label for="fecha">Fecha</label>
          <input
            type="date"
            name="fecha"
            id="fecha"
            defaultValue={fechaHoy}
            min={fechaHoy}
          />
        </div>

        <div className="searchbyDistance">
          <label for="distancia">Distancia</label>
          <input
            type="range"
            name="distancia"
            id="distancia"
            min="0"
            max="100000"
            defaultValue="0"
            onChange={calcDistance}
          />
          <p>
            Distance: <span id="demo"></span>
          </p>
        </div>

        <button type="submit" style={{ margin: 0 }}>
          Buscar
        </button>
      </form>
    </div>
  );
}
