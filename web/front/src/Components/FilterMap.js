import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker.js";
import filtericon from "../Images/filter.svg";

const zoom = 13;
let events = [];
let maxDistance = 500;
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
month = month < 10 ? "0" + month : month;
day = day < 10 ? "0" + day : day;
const fechaHoy = year + "-" + month + "-" + day;
let center = [41.390205, 2.154007];

function Filter() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState(fechaHoy);

    const nombreFiesta = (event) => {
        setNombre(event.target.value);
    };

    const fechaFiesta = (event) => {
        setFecha(event.target.value);
    };

    const distanciaFiesta = (event) => {
        maxDistance = event.target.value;
        let output = document.getElementById("distance");
        output.innerHTML = "Distance: " + maxDistance + " km";
    };

    const buscar = () => {
        let formDataFilter = new FormData();
        if (fecha)
            formDataFilter.append("date", fecha);
        if (nombre)
            formDataFilter.append("search", nombre);
        if (selectedCategory)
            formDataFilter.append("category", selectedCategory);
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-events", {
            method: "POST",
            body: formDataFilter,
        }).then((response) => response.json()).then((data) => (events = data.events));
    };

    const categoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    useEffect(() => {
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-events", {
            method: "POST",
        }).then((response) => response.json()).then((data) => {
            events = data.events;
        });
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-categories", {
            method: "GET",
        }).then((response) => response.json()).then((data) => {
            setCategories(data.categories);
        });
    }, []);

    return (
        <div className="filtersContainer">
            <img src={filtericon} alt="filter icon" width={50} />
            <div className="searchbyName">
                <label htmlFor="nombre">Buscador</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre del organizador, evento o ubicaci??n"
                    value={nombre}
                    onChange={nombreFiesta}
                />
            </div>
            <div className="searchbyDate">
                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    id="fecha"
                    defaultValue={fechaHoy}
                    min={fechaHoy}
                    onChange={fechaFiesta}
                />
            </div>
            {!nombre && (<div className="searchbyDistance">
                <label htmlFor="distancia">Distancia</label>
                <input
                    type="range"
                    name="distancia"
                    id="distancia"
                    min="0"
                    max="100"
                    defaultValue="0"
                    onChange={distanciaFiesta}
                />
                <span id="distance"></span>
            </div>)}
            <div className="searchbyCategory">
                <label htmlFor="category">Categorias</label>
                <select name="category" id="categories" onChange={(e) => categoryChange(e)}>
                    {categories.map((category, i) =>
                        <option id={i} value={category}>{category}</option>
                    )}
                </select>
            </div>
            <button type="submit" className="buscador" onClick={buscar}>
                Buscar
            </button>
        </div >
    );
}

function Map() {
    const [eventsMap, setEventsMap] = useState([]);
    const L = window.L;

    const getCoords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                center = [position.coords.latitude, position.coords.longitude];
            });
        }
    };

    function MoveToLocation() {
        const map = useMap();
        map.flyTo(center, 13);
    }

    function calcDistance(coords) {
        coords = JSON.parse(coords);
        let centerLatLng = L.latLng(center[0], center[1]);
        let event = L.latLng(coords[0], coords[1]);
        let distancia = centerLatLng.distanceTo(event);
        return distancia;
    }

    function renderMarkers() {
        let tmp = [];
        events.forEach(function (event) {
            let distance = calcDistance(event.coords);
            if (parseInt(distance) < maxDistance * 1000) {
                tmp.push(event);
            }
        });
        setEventsMap(tmp);
    };

    useEffect(() => {
        getCoords();
        setInterval(function () {
            renderMarkers();
        }, 1000);
    }, []);

    // var markers = L.markerClusterGroup();
    // console.log(eventsMap);
    // markers.addLayer(eventsMap);
    // markers.addTo(L.map("map"));

    return (
        <>
            <MapContainer center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <MoveToLocation /> */}
                {eventsMap.map((event) => (
                    <MarkerComponent key={event.name} event={event} />
                ))}
            </MapContainer>
        </>
    );
}

export default function FilterMap() {
    return (
        <div className="filtersMap">
            <Filter />
            <Map />
        </div>
    );
}