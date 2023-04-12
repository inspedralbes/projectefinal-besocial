import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import TicketImg from "../Images/bedisco.jpg";

export default function Ticket({ assist }) {
  return (
    <div className="ticket">
      <img src={TicketImg} className="imageTicket">
      </img>
      <div className="textTicket">
        <button>Edit</button>
        <p className="titleTicket">{assist.organizerName}</p>
        <p>{assist.date} - {assist.name}</p>
      </div>
    </div>
  )
}
