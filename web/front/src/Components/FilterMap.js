import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker.js";
import filtericon from "../Images/filter.svg";

let events = [];
let maxDistance = 500;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const fechaHoy = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day
    }`;
const token = getCookie("cookie_token");

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
        document.getElementById(
            "distance"
        ).innerHTML = `Distancia: ${maxDistance} km`;
    };

    const buscar = () => {
        const formDataFilter = new FormData();
        if (fecha) formDataFilter.append("date", fecha);
        if (nombre) formDataFilter.append("search", nombre);
        if (selectedCategory) formDataFilter.append("category", selectedCategory);
        fetch("http://127.0.0.1:8000/api/get-events", {
            method: "POST",
            body: formDataFilter,
        })
            .then((response) => response.json())
            .then((data) => (events = data.events));
    };

    const categoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/get-events", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => (events = data.events));
        fetch("http://127.0.0.1:8000/api/get-categories", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.categories);
            });
    }, []);

    return (
        <div className="p-4 bg-zinc-900 text-white flex gap-2 flex-col">
            <img src={filtericon} width={55} />
            <div className="grid mb-4">
                <label
                    htmlFor="nombre"
                    className="font-semibold text-xl text-zinc-50 pb-1 "
                >
                    Search
                </label>
                <input
                    className="rounded-md p-2 focus:outline-violet-700 caret-violet-700 text-violet-700"
                    type="text"
                    name="nombre"
                    id="nombre"
                    placeholder="Nombre del organizador, evento o ubicación"
                    value={nombre}
                    onChange={nombreFiesta}
                />
            </div>
            <div className="grid mb-4">
                <label
                    htmlFor="fecha"
                    className="font-semibold text-xl text-zinc-50 pb-1"
                >
                    Date
                </label>
                <input
                    className="rounded-md p-2 focus:outline-violet-700 caret-violet-700 text-violet-700"
                    type="date"
                    name="fecha"
                    id="fecha"
                    defaultValue={fechaHoy}
                    min={fechaHoy}
                    onChange={fechaFiesta}
                />
            </div>
            {!nombre && (
                <div className="grid mb-4">
                    <label
                        htmlFor="distancia"
                        className="font-semibold text-xl text-zinc-50 pb-1"
                    >
                        Distance
                    </label>
                    <input
                        className="range range-primary range-sm"
                        type="range"
                        name="distancia"
                        id="distancia"
                        min="0"
                        max="100"
                        defaultValue="0"
                        onChange={distanciaFiesta}
                    />
                    <span id="distance"></span>
                </div>
            )}
            <div className="grid">
                <label
                    htmlFor="category"
                    className="font-semibold text-xl text-zinc-50 pb-1"
                >
                    Genres
                </label>
                <select
                    className="select select-primary text-violet-700"
                    name="category"
                    id="categories"
                    onChange={(e) => categoryChange(e)}
                >
                    {categories.map((category, i) => (
                        <option key={i} id={i} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-outline btn-primary mt-8 bg-zinc-100" onClick={buscar}>
                Search
            </button>
        </div>
    );
}

function Map() {
    const [eventsMap, setEventsMap] = useState([]);
    const [center, setCenter] = useState([41.390205, 2.154007]);
    const [markersRendered, setMarkersRendered] = useState(false);
    const [alreadyFlied, setAlreadyFlied] = useState(false);
    const L = window.L;

    const getCoords = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCenter([position.coords.latitude, position.coords.longitude]);
        });
    };

    function MoveToLocation() {
        const map = useMap();
        if (
            center[0] !== 41.390205 &&
            center[1] !== 2.154007 &&
            markersRendered &&
            !alreadyFlied
        ) {
            map.flyTo(center, 13);
            setAlreadyFlied(true);
        }
    }

    function calcDistance(coords) {
        const [lat, lng] = JSON.parse(coords);
        const centerLatLng = L.latLng(center[0], center[1]);
        const event = L.latLng(lat, lng);
        const distance = centerLatLng.distanceTo(event);
        return distance;
    }

    function renderMarkers() {
        const tmp = events.filter((event) => {
            const distance = calcDistance(event.coords);
            return parseInt(distance) < maxDistance * 1000;
        });
        setEventsMap(tmp);
        setMarkersRendered(true);
    }

    useEffect(() => {
        getCoords();
        const interval = setInterval(renderMarkers, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <MapContainer center={center} zoom={10} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {eventsMap.map((event, i) => (
                <MarkerComponent key={i} event={event} token={token} />
            ))}
            <MoveToLocation />
        </MapContainer>
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
