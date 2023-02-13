import React from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Images/location-icon.png';
import linkSvg from '../Images/heroicons-external_link-small.svg';
import like from "../Images/like.png";

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [32, 32],
    iconAnchor: [14, 30],
    popupAnchor: [0, -30]
});


export default function MarkerComponent({ event }) {

function likeEvent(){
    console.log(event.id);
}

    return (
        <Marker position={JSON.parse(event.coords)} icon={customMarker}>
            <Popup>
                {/* <img src={event.img} alt="Foto event" width="300px" /> */}
                <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
                <h1>{event.organizer}</h1>
                <h3>{event.name}</h3>
                <img className="likeSvg" src={like} onClick={likeEvent} ></img>
                <p>{event.date} - {event.hour}
                    <br></br>
                    {event.address}, {event.postal_code}, {event.city}</p>
                {/* <div className='categoriesPopup'>
                    <div><strong>{event.categories[0]}</strong></div>
                    <div><strong>{event.categories[1]}</strong></div>
                    <div><strong>{event.categories[2]}</strong></div>
                </div> */}
            </Popup>
        </Marker>
    );
}