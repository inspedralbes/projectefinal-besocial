import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import TicketImg from "../Images/bedisco.jpg";

export default function Ticket({ assist, likes }) {
  return (
    <div className="w-[270px] h-[260px] rounded-b-lg rounded-t-[50px] bg-white mx-auto">
      <img src={TicketImg} className="rounded-t-lg">
      </img>
      <div className="textTicket">
        <button>Edit</button>
        <p className="titleTicket">{assist.organizerName}</p>
        <p>{assist.date} - {assist.name}</p>
      </div>
    </div>
  )
}
