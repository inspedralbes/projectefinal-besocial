import React from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Media/venue_location_icon.svg';
import linkSvg from '../Media/heroicons-external_link-small.svg';


const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [42, 42],
    iconAnchor: [20, 40],
    popupAnchor: [0, -39]
});

export default function MarkerComponent({ event }) {
    return (
        <Marker position={event.coords} icon={customMarker}>
            <Popup>
                <img src={event.img} alt="Foto event" width="300px"/>
                <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
                <h1>{event.name}</h1>
                <h3>{event.organizer}</h3>
                <p>{event.location}</p>
                <div className='categoriesPopup'>
                    <div><strong>{event.categories[0]}</strong></div>
                    <div><strong>{event.categories[1]}</strong></div>
                    <div><strong>{event.categories[2]}</strong></div>
                </div>
            </Popup>
        </Marker>
    );
}