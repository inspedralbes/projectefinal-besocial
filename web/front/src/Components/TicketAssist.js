import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist }) {
  const [diaSetmana, setDiaSetmana] = useState();
  const [assistBtn, setAssistBtn] = useState("Unirse");
  const token = getCookie("cookie_token");
  const [readyAssist, setReadyAssist] = useState(false);


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

    fetchMarkerAssists();
  }, []);

  function fetchMarkerAssists() {
    fetch("http://127.0.0.1:8000/api/get-assist", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userAssists = data.assistencia;
        let isAssisted = false;
        for (let i = 0; i < userAssists.length; i++) {
          if (userAssists[i].id_event === assist.id) {
            isAssisted = true;
            break;
          }
        }
        setAssistBtn(isAssisted ? "Unido" : "Unirse");
        setReadyAssist(true);
      });
  }

  function toggleAssistance() {
    const endpoint = assistBtn === "Unido" ? "delete-assist" : "save-assist";
    const newAssistBtn = assistBtn === "Unido" ? "Unirse" : "Unido";
    setAssistBtn(newAssistBtn);

    const assistFormData = new FormData();

    assistFormData.append("eventId", assist.id);

    fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: "POST",
      body: assistFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <a href={assist.link} target="_blank">
      <div className="card group/close w-96 h-full bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110">
        <figure>
          <img src={assist.photo} className=""></img>
        </figure>
        <div className="card-body">
          <div className="card-actions justify-end ">
            <button className="invisible group-hover/close:visible">
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
          <button className={assistBtn} onClick={toggleAssistance}>
            {assistBtn}
          </button>
        </div>
      </div>
    </a>
  );
}
