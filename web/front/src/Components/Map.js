import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import MarkerComponent from './Marker.js';

const zoom = 8;

export default function MapComponent() {

    const [events, setEvents] = useState([]);
    const [center, setCenter] = useState([41.83750, 1.53778]);

    const getCoords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setCenter([position.coords.latitude, position.coords.longitude]);
            });
        }
    }

    function MoveToLocation() {
        const map = useMap();
        map.flyTo(center, 13);
    }

    const fetchEvents = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        // const json = await response.json();
        const json = [
            { organizer: "Razzmatazz", name: "Mandanga", date: "02/02/2023", hour: "00:30", coords: [41.397744379599104, 2.191108069962903], location: "C/ dels Almogàvers, 122, 08018 Barcelona", categories: ["Categoria 1", "Categoria 2", "Categoria 3"], link: "https://www.salarazzmatazz.com/02-02-2023/main-de-hits", img:"https://www.salarazzmatazz.com/storage/artists/LogoWebRAZZMandanga.png" },
            { organizer: "Pacha", name: "La Juerga", date: "02/02/2023", hour: "00:00", coords: [41.38574615107647, 2.1970725224502194], location: "C/ de Ramon Trias Fargas, 2, 08005 Barcelona", categories: ["Categoria 1", "Categoria 2", "Categoria 3"], link: "https://pachabarcelona.es/es/events#/es/event/la-juerga-w-munic-hb-at-pacha-barcelona--117477", img:"https://images.evendo.com/cdn-cgi/image/f=auto,width=777,quality=75/images/5284c57c4fd54611998852680fa8217b.png" },
            { organizer: "Downtown", name: "Thursdays", date: "02/02/2023", hour: "00:00", coords: [41.381056546000245, 2.1146745564267952], location: "Av. Dr. Marañón, 17, 08028 Barcelona", categories: ["Categoria 1", "Categoria 2", "Categoria 3"], link: "https://downtownbarcelona.es/eventos/",img:"https://youbarcelona.com/uploads/images/events/52/og_image.png?v=63840000693" },
            { organizer: "Wolf", name: "Wolfeo", date: "02/02/2023", hour: "00:30", coords: [41.395894836942524, 2.18859718823712], location: "C/ dels Almogàvers, 88, 08018 Barcelona", categories: ["Categoria 1", "Categoria 2", "Categoria 3"], link: "https://wolfbarcelona.com/sesiones/wolfeo-jueves-14-dic/",img:"https://cdn.premiumguest.com/flyers/w_webimagenessesiones1600x785pxwolfeo202226feb.png" },
        ];
        setEvents(json);
    };

    useEffect(() => {
        getCoords();
        fetchEvents();
    }, []);

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: "93vh", width: "100vw" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {events.map((event) => (
                <MarkerComponent key={event.name} event={event} />
            ))}
            <MoveToLocation />
        </MapContainer>
    );
}