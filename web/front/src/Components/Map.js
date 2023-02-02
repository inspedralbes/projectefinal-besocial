import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from './venue_location_icon.svg';


const MapComponent = () => {
    const [center, setCenter] = useState([0,0])
    const zoom = 13;
    const coordsRazz = [41.397724311875244, 2.1911291242819];
    const mapRef = React.createRef();
    window.m = mapRef.current;

    
    const customMarker = L.icon({
        iconUrl: markerImage,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -35],
    });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((c) => {
            console.log("la latotud" + c.coords.latitude)
            let newCenter=[...center]
            newCenter[0]= 4
            //setCenter([c.coords.latitude, c.coords.longitude]);
            setCenter(newCenter)

            console.log("hola" + center);
            
            console.log(center);
           
            centrarMapa();
        },
        (error) => {
            console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }, []);
    
    const centrarMapa = () => {
        const map = mapRef.current;
        console.log(center);
        if (map!=null) {
            console.log("mapa centrado");
            map.flyTo(center, zoom,{
                animate: true,
                duration: 1000,
            });
        }
    }
    
    
    // const  = () => {
        return(
            <MapContainer 
                id = "mapa"
                center={center} 
                zoom={zoom}
                style={{ height: "100vh", width: "100vw" }}
                ref={mapRef}
                >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
                position={coordsRazz} 
                icon={customMarker}
            >

                <Popup >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Salida_de_Razzmatazz.JPG" alt="Razzmatazz" style={{width: "100%", borderRadius:"12px 12px 0 0"}}></img>
                        <div class="container">
                            <h1><b>Sala Razzmatazz</b></h1>
                            <a href="https://www.salarazzmatazz.com/ca/" target="_blank" rel="noreferrer noopener"><img src="https://www.svgrepo.com/show/15274/external-link.svg" alt="open in new tab"style={{width: "10%"}}></img></a> 
                            

                            <h4>C/ dels Almogàvers, 122, 08018 Barcelona</h4>
                        </div>
                </Popup>

            </Marker>
            </MapContainer>
        );
    };
// }
export default MapComponent;
