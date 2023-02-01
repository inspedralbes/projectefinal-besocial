import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from './map-marker.svg';

const position = [41.39776662950863, 2.191060344461916];
const zoom = 13;

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
});

const MapComponent = () => {
    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
            click() {
                map.locate()
                console.log('locate')
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })
    }

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: "93%", width: "100%" }}
            whenReady={() => {
                console.log("This function will fire once the map is created")
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customMarker}>
                <Popup>
                    A popup for the marker in Barcelona
                </Popup>
            </Marker>
            <LocationMarker />
        </MapContainer>
    );
};

export default MapComponent;
