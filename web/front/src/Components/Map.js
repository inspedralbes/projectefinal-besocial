import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker.js";
import filtericon from "./filter.svg";

const zoom = 8;
let events = "";

function Filter() {
    const [nombre, setNombre] = useState("");
    const [distanciaFiltro, setDistanciaFiltro] = useState(0);

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

    setInterval(function () {
        var slider = document.getElementById("distancia");
        var output = document.getElementById("demo");
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        };
    }, 1000);

    // function calcDistance() {
    //     var x = document.getElementById("distancia").value;
    //     document.getElementById("demo").innerHTML = x;
    // }

    const nombreFiesta = (event) => {
        setNombre(event.target.value);
    };

    const fechaFiesta = (event) => {
        setFecha(event.target.value);
    };

    const distanciaFiesta = (event) => {
        setDistanciaFiltro(event.target.value);
    };

    const buscar = async () => {
        let formDataFilter = new FormData();
        formDataFilter.append("date", fecha);
        formDataFilter.append("search", nombre);
        formDataFilter.append("category", "");

        const response = await fetch("http://127.0.0.1:8000/api/get-events", {
            method: "POST",
            body: formDataFilter,
        })
            .then((response) => response.json())
            .then((data) => (events = data));
    };

    return (
        <div className="filtersContainer">
            <img src={filtericon} alt="filter icon" width={50} />

            <div className="searchbyName">
                <label for="nombre">Nombre</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre del evento o local"
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
                <p>
                    Distance: <span id="demo"></span>
                </p>
            </div>

            <button type="submit" style={{ margin: 0 }} onClick={buscar}>
                Buscar
            </button>
        </div>
    );
}

function MapComponent() {
    const [eventsMap, setEventsMap] = useState([]);
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
        events.events.forEach(function (event) {
            let distance = calcDistance(event.coords);
            if (parseInt(distance) < 1000000) {
                console.log(event);
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
                style={{ height: "93vh", width: "100vw" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MoveToLocation />
                {/* <RenderMarkers /> */}
            </MapContainer>
        </>
    );
}

export default MapComponent;
