import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';

export default function Ticket({ assist }) {
  return (
    <div className="w-[270px] h-[260px] rounded-b-lg rounded-t-[50px] bg-white mx-auto">
      <img src={assist.photo} className="rounded-t-lg" style={{ width: "300px", height: "160px"}}>
      </img>
      <div className="textTicket">
        <button>Edit</button>
        <p className="titleTicket">{assist.name}</p>
        <p>{assist.date.split("-")[0]}/{assist.date.split("-")[1]}/{assist.date.split("-")[2]} - {assist.organizerName}</p>
      </div>
    </div>
  )
}
