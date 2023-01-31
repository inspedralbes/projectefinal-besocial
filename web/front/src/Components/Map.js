import React from "react";
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
    return(
        <MapContainer 
            center={center} 
            zoom={zoom}
            style={{ height: "100vh", width: "100vw" }}
            
            >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
            position={center} 
            icon={customMarker}
        >

            <Popup >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Salida_de_Razzmatazz.JPG" alt="Avatar" style={{width: "100%", borderRadius:"12px 12px 0 0"}}></img>
                    <div class="container">
                        <h1><b>Sala Razzmatazz</b></h1>
                        <h4>C/ dels Almogàvers, 122, 08018 Barcelona</h4>
                    </div>
            </Popup>

        </Marker>
        </MapContainer>
    );
};

export default MapComponent;
