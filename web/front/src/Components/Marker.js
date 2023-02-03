import React from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Images/location-icon.png';

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36]
});

export default function MarkerComponent({ event }) {
    return (
        <Marker position={event.coords} icon={customMarker}>
            <Popup>
                {event.name}
            </Popup>
        </Marker>
    );
}