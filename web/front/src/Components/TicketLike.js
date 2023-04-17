import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import TicketImg from "../Images/bedisco.jpg";

export default function Ticket({ like }) {
  return (
    <div className="ticket">
      <img src={TicketImg} className="imageTicket">
      </img>
      <div className="textTicket">
        <button>Edit</button>
        <p className="titleTicket">{like.organizerName}</p>
        <p>{like.date} - {like.name}</p>
      </div>
    </div>
  )
}
