import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist, onDelete }) {
  const [diaSetmana, setDiaSetmana] = useState();
  const token = localStorage.getItem("cookie_token");

  useEffect(() => {
    if (assist.dayOfWeek != null) {
      if (assist.dayOfWeek == 1) {
        setDiaSetmana("Monday ");
      } else if (assist.dayOfWeek == 2) {
        setDiaSetmana("Tuesday ");
      } else if (assist.dayOfWeek == 3) {
        setDiaSetmana("Wednesday ");
      } else if (assist.dayOfWeek == 4) {
        setDiaSetmana("Thursday ");
      } else if (assist.dayOfWeek == 5) {
        setDiaSetmana("Friday ");
      } else if (assist.dayOfWeek == 6) {
        setDiaSetmana("Saturday ");
      } else if (assist.dayOfWeek == 0) {
        setDiaSetmana("Sunday ");
      }
    }
  }, []);

  function cancelAssist() {
    const assistFormData = new FormData;
    assistFormData.append("eventId", assist.id);

    fetch("http://localhost:8000/api/delete-assist", {
      method: "POST",
      body: assistFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then(
      // //console.log(assist.id),
      onDelete()
    )
  }

  return (
    <div className="card group/close h-full lg:w-96 w-[90%] bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110 m-auto">
      <figure>
        <img src={assist.photo} style={{ height: "250px", width: "100%" }}></img>
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end ">
          <button className="btn btn-square btn-sm invisible group-hover/close:visible absolute " onClick={cancelAssist}>
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
        <h1 className="card-title text-3xl">{assist.organizerName}</h1>
        <h2 className="text-xl font-medium">{assist.name}</h2>
        <p>
          {assist.dayOfWeek == null ? (assist.date.split("-")[2] + '/' + assist.date.split("-")[1]) : ('Every ' + diaSetmana)}
        </p>
        <p>{assist.hour}</p>
      </div>
    </div>
  );
}
