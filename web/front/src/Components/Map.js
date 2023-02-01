import React , { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from './map-marker.svg';


const center = [41.39776662950863, 2.191060344461916];
const zoom = 13;

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [41, 41],
});

const MapComponent = () => {
    const [showPopup, setShowPopup] = useState(false);

    return(
        <MapContainer 
            center={center} 
            zoom={zoom}
            style={{ height: "93%", width: "100%" }}
            
            >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
            position={center} 
            onClick={() => setShowPopup(true)}
            icon={customMarker}
        >
            {showPopup ? (
            <Popup onClose={() => setShowPopup(false)}>
                A popup for the marker in Barcelona
            </Popup>
            ) : null}
        </Marker>
        </MapContainer>
    );
};

export default MapComponent;
