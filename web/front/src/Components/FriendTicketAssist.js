import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist }) {
  const [diaSetmana, setDiaSetmana] = useState();

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

  return (
    // <a href={assist.link} target="_blank">
    <div className="show card group/close lg:w-96 h-full bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110">
      <figure>
        <img src={assist.photo} style={{ height: "250px", width: "100%" }}></img>
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end ">
        </div>
        <h1 className="card-title text-3xl">{assist.organizerName}</h1>
        <h2 className="text-xl font-medium">{assist.name}</h2>
        <p>
          {assist.dayOfWeek == null ? (assist.date.split("-")[2] + '/' + assist.date.split("-")[1]) : ('Every ' + diaSetmana)}
        </p>
        <p>{assist.hour}</p>
      </div>
    </div>
    // </a>
  );
}
