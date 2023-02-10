import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker.js";
import filtericon from "./filter.svg";

const zoom = 8;
let events = "";
let maxDistance = 50000;

function Filter() {
    const [nombre, setNombre] = useState("");

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

    const [fecha, setFecha] = useState(fechaHoy);

    const nombreFiesta = (event) => {
        setNombre(event.target.value);
    };

    const fechaFiesta = (event) => {
        setFecha(event.target.value);
    };

    const distanciaFiesta = (event) => {
        maxDistance = event.target.value;
        var output = document.getElementById("demo");
        output.innerHTML = "Distance: " + parseInt(maxDistance / 1000) + " km";
    };

    const buscar = () => {
        let formDataFilter = new FormData();
        formDataFilter.append("date", fecha);
        formDataFilter.append("search", nombre);
        formDataFilter.append("category", "");
        fetch("http://127.0.0.1:8000/api/get-events", {
            method: "POST",
            body: formDataFilter,
        }).then((response) => response.json()).then((data) => (events = data.events));
    };

    return (
        <div className="filtersContainer">
            <img src={filtericon} alt="filter icon" width={50} />
            <div className="searchbyName">
                <label for="nombre">Buscador</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre del organizador, evento o ubicación"
                    value={nombre}
                    onChange={nombreFiesta}
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
                    onChange={fechaFiesta}
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
                    onChange={distanciaFiesta}
                />
                <span id="demo"></span>
            </div>
            <button type="submit" className="buscador" onClick={buscar}>
                Buscar
            </button>
        </div>
    );
}

function MapComponent() {
    const [center, setCenter] = useState([41.8375, 1.53778]);
    const L = window.L;

    const getCoords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter([position.coords.latitude, position.coords.longitude]);
            });
        }
    };

    function MoveToLocation() {
        const map = useMap();
        map.flyTo(center, 13);
    }

    const RenderMarkers = () => {
        events.forEach(function (event) {
            let distance = calcDistance(event.coords);
            if (parseInt(distance) < maxDistance) {
                return <MarkerComponent key={event.name} event={event} />;
            }
        });
    };

    function calcDistance(coords) {
        coords = JSON.parse(coords);
        let centerLatLng = L.latLng(center[0], center[1]);
        let event = L.latLng(coords[0], coords[1]);
        let distancia = centerLatLng.distanceTo(event);
        return distancia;
    }

    useEffect(() => {
        getCoords();
        setInterval(function () {
            if (events) {
                RenderMarkers();
            }
        }, 1000);
    }, [events]);

    return (
        <>
            <Filter />
            <MapContainer
                center={center}
                zoom={zoom}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MoveToLocation />
            </MapContainer>
        </>
    );
}

export default MapComponent;
