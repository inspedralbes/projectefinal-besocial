import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ like }) {
  const [diaSetmana, setDiaSetmana] = useState();

  useEffect(() => {
    if (like.dayOfWeek != null) {
      if (like.dayOfWeek == 1) {
        setDiaSetmana("Lunes - ");
      } else if (like.dayOfWeek == 2) {
        setDiaSetmana("Martes - ");
      } else if (like.dayOfWeek == 3) {
        setDiaSetmana("Miercoles - ");
      } else if (like.dayOfWeek == 4) {
        setDiaSetmana("Jueves - ");
      } else if (like.dayOfWeek == 5) {
        setDiaSetmana("Viernes - ");
      } else if (like.dayOfWeek == 6) {
        setDiaSetmana("Sabado - ");
      } else if (like.dayOfWeek == 0) {
        setDiaSetmana("Domingo - ");
      }
    }

    console.log(diaSetmana);
  }, []);

  return (
    <a href={like.link} target="_blank">
      <div className="card h-full w-96 bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110">
        <figure>
          <img src={like.photo} className=""></img>
        </figure>
        <div className="card-body">
          <h1 className="card-title text-3xl">{like.name}</h1>
          <h2 className="text-xl font-medium">{like.organizerName}</h2>
          <p>
            {diaSetmana}
            {like.date.split("-")[2]}/{like.date.split("-")[1]}
          </p>
          <p>{like.hour}</p>
        </div>
      </div>
    </a>
  );
}
