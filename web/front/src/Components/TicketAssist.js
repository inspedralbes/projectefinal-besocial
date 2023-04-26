import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist, onDelete }) {
  const [diaSetmana, setDiaSetmana] = useState();
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

  function cancelAssist() {
    const assistFormData = new FormData;
    assistFormData.append("eventId", assist.id);
    // console.log(assist);

      fetch("http://localhost:8000/api/delete-assist", {
        method: "POST",
        body: assistFormData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      }).then(
        console.log("onDelete"),
        onDelete()
      )
  }

  return (
    // <a href={assist.link} target="_blank">
    <div className="card group/close w-96 h-full bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110">
      <figure>
        <img src={assist.photo} className=""></img>
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end ">
          <button className="btn btn-square btn-sm invisible group-hover/close:visible" onClick={cancelAssist}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="card-title text-3xl">{assist.name}</h1>
        <h2 className="text-xl font-medium">{assist.organizerName}</h2>
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
