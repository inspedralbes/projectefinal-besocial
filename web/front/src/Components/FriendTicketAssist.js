import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist, onDelete }) {
  const [diaSetmana, setDiaSetmana] = useState();
  const token = localStorage.getItem("cookie_token");

  

  useEffect(() => {
    if (assist.dayOfWeek != null) {
      if (assist.dayOfWeek == 1) {
        setDiaSetmana("Lunes - ");
      } else if (assist.dayOfWeek == 2) {
        setDiaSetmana("Martes - ");
      } else if (assist.dayOfWeek == 3) {
        setDiaSetmana("Miercoles - ");
      } else if (assist.dayOfWeek == 4) {
        setDiaSetmana("Jueves - ");
      } else if (assist.dayOfWeek == 5) {
        setDiaSetmana("Viernes - ");
      } else if (assist.dayOfWeek == 6) {
        setDiaSetmana("Sabado - ");
      } else if (assist.dayOfWeek == 0) {
        setDiaSetmana("Domingo - ");
      }
    }
  }, []);

  return (
    // <a href={assist.link} target="_blank">
    <div className="card group/close w-96 h-full bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110">
      <figure>
        <img src={assist.photo} className=""></img>
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end ">
        </div>
        <h1 className="card-title text-3xl">{assist.organizerName}</h1>
        <h2 className="text-xl font-medium">{assist.name}</h2>
        <p>
          {diaSetmana}
          {assist.date.split("-")[2]}/{assist.date.split("-")[1]}
        </p>
        <p>{assist.hour}</p>
      </div>
    </div>
    // </a>
  );
}