import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import MarkerComponent from "./Marker.js";
import EventCard from "./EventCard.js";
import filtericon from "../Images/filter.svg";
import Swal from "sweetalert2";
import loading from "../Images/loading_black.gif";
import linkSvg from "../Images/heroicons-external_link-small.svg";

let events = [];
let maxDistance = 999999999;
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const fechaHoy = `${year}-${month < 10 ? "0" + month : month}-${
  day < 10 ? "0" + day : day
}`;
const token = localStorage.getItem("cookie_token");

function Filter() {
  const [categories, setCategories] = useState([]);
  const [topEvents, setTopEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState(fechaHoy);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const nombreFiesta = (event) => {
    setNombre(event.target.value);
    maxDistance = 999999999;
  };

  const fechaFiesta = (event) => {
    setFecha(event.target.value);
  };

  const distanciaFiesta = (event) => {
    maxDistance = event.target.value;
    document.getElementById("distance").innerHTML = ` ${maxDistance} km`;
  };

  const buscar = () => {
    document.getElementById("modal-loading").classList.remove("hidden");
    const formDataFilter = new FormData();
    if (fecha) formDataFilter.append("date", fecha);
    if (nombre) formDataFilter.append("search", nombre);
    if (selectedCategory) formDataFilter.append("category", selectedCategory);
    fetch("http://127.0.0.1:8000/api/get-events", {
      method: "POST",
      body: formDataFilter,
    })
      .then((response) => response.json())
      .then((data) => {
        events = data.events;
        setTimeout(function () {
          window.scrollTo(0, document.body.scrollHeight);
          document.getElementById("modal-loading").classList.add("hidden");
        },2000);

      });
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
    getTopEvents();
  }, []);

  const getTopEvents = () => {
    fetch("http://127.0.0.1:8000/api/get-top-events", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setTopEvents(data.events);
        setCarouselLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(function () {
      nextSlide();
    }, 5000);
  }, [currentIndex, carouselLoading]);

  const prevSlide = () => {
    if (topEvents.length > 1) {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? topEvents.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const nextSlide = () => {
    if (topEvents.length > 1) {
      const isLastSlide = currentIndex === topEvents.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="p-4 bg-zinc-900 text-white flex gap-2 flex-col">
      <img src={filtericon} width={65} />
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
          placeholder="Organizer, event or location"
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
          <div>
            <label
              htmlFor="distancia"
              className="font-semibold text-xl text-zinc-50 pb-1"
            >
              Distance
            </label>
            <span id="distance"></span>
          </div>
          <input
            className="range range-primary range-sm "
            type="range"
            name="distancia"
            id="distancia"
            min="0"
            max="100"
            defaultValue="50"
            onChange={distanciaFiesta}
          />
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
          <option value=""></option>
          {categories.map((category, i) => (
            <option key={i} id={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <label
        type="submit"
        htmlFor="my-modal"
        className="btn btn-outline btn-primary hover:bg-violet-800 mt-8 bg-zinc-100"
        onClick={buscar}
      >
        Search
      </label>
      <input type="checkbox" id="my-modal" className="modal-toggle"></input>
      <div className="modal" id="modal-loading">
        <div className="modal-box w-64">
          <div className="text-center duration-500">
            <div>
              <svg
                aria-hidden="true"
                className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violet-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-8 mb-4"></hr>
      <h3 className="font-semibold text-xl text-zinc-50 pb-1 text-center">
        Most attended events for today
      </h3>
      <div className="mt-2 h-fit w-full relative group">
        {carouselLoading ? (
          <div className="text-center duration-500">
            <div>
              <svg
                aria-hidden="true"
                className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violet-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="card group/close h-[230px] w-full bg-base-100 shadow-xl image-full duration-500">
            <figure>
              <img
                src={topEvents[currentIndex].photo}
                style={{ height: "250px", width: "100%" }}
              ></img>
            </figure>
            <div className="card-body duration-500 flex justify-center items-center">
              {/* <div className="absolute top-[35%] translate-x-0 translate-y-[50%] left-2 text-2xl rounded-full p-2 bg-black/10 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="w-6 h-6"
                  onClick={prevSlide}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </div> */}
              <h1 className="card-title text-4xl text-white text-center">
                {topEvents[currentIndex].organizer}
              </h1>
              <h2 className="text-2xl font-medium text-white text-center">
                {topEvents[currentIndex].name}
              </h2>
              <a
                href={topEvents[currentIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center invert"
              >
                <img src={linkSvg} className="w-10"></img>
              </a>
              {/* <div className="absolute top-[35%] translate-x-0 translate-y-[50%] right-2 text-2xl rounded-full p-2 bg-black/10 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  className="w-6 h-6"
                  onClick={nextSlide}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div> */}
            </div>
          </div>
        )}
      </div>
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
    <MapContainer
      center={center}
      zoom={8}
      scrollWheelZoom={true}
      className="z-0 h-screen lg:h-[auto]"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {eventsMap.map((event, i) => (
        <MarkerComponent key={i} event={event} token={token} />
      ))}
      <MoveToLocation />
    </MapContainer>
  );
}

function List() {
  const [eventsMap, setEventsMap] = useState([]);
  const [center, setCenter] = useState([41.390205, 2.154007]);
  const L = window.L;

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter([position.coords.latitude, position.coords.longitude]);
    });
  };

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
  }

  useEffect(() => {
    getCoords();
    const interval = setInterval(renderMarkers, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid p-9 lg:mt-14 lg:grid-cols-4 gap-8 items-start scroll-smooth">
      {eventsMap.map((event, i) => (
        <EventCard key={i} event={event} token={token} />
      ))}
    </div>
  );
}

export default function FilterMap() {
  const [activeComponent, setActiveComponent] = useState("map");

  function handleChecked(component) {
    if (component == "map") {
      setActiveComponent("map");
      document.getElementById("tab1").checked = true;
    } else if (component == "list") {
      setActiveComponent("list");
      document.getElementById("tab2").checked = true;
    }
  }

  return (
    <>
      <div className="filtersMap grid md:grid-cols-[1fr,4fr] min-h-[93vh]">
        <Filter />
        {activeComponent == "map" ? <Map /> : <List />}
      </div>
      <div className="w-[200px] m-auto absolute flex rounded-[50px] bg-[#732592] top-[90px] right-[32px] z-[500]">
        <div className="radio-inputs">
          <label className="radio" onClick={() => handleChecked("map")}>
            <input type="radio" id="tab1" name="radio" defaultChecked></input>
            <span className="name">Map</span>
          </label>
          <label className="radio" onClick={() => handleChecked("list")}>
            <input type="radio" id="tab2" name="radio"></input>
            <span className="name">List</span>
          </label>
        </div>
      </div>
    </>
  );
}
