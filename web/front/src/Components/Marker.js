import React, { useState, useEffect } from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Images/location-icon.png';
import linkSvg from '../Images/heroicons-external_link-small.svg';
import like from "../Images/like.svg";
import likeRed from "../Images/like-fill.svg";
import "../Pages/css/marker.css";

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [32, 32],
    iconAnchor: [14, 30],
    popupAnchor: [2, -25]
});

export default function MarkerComponent({ event }) {
    const [token, setToken] = useState();
    const [likeSrc, setSrc] = useState([]);
    const [assistBtn, setBtn] = useState([]);
    const [totalLikes, setTotal] = useState([]);

    useEffect(() => {
        setToken(getCookie("cookie_token"));
    }, []);

    useEffect(() => {
        if (token) {
            markerLikes();
            markerAssists();
            getTotalLikes();
        }
    }, [token])

    function getTotalLikes() {
        let totalLikesFormData = new FormData();
        totalLikesFormData.append("eventId", event.id);
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/getAllLikes", {
            method: "POST",
            body: totalLikesFormData
        })
            .then(response => response.json())
            .then(data => {
                setTotal(data.likes[0])
            });
    }

    function markerLikes() {
        let userLikes = [];
        let length;
        setSrc(like);
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-like", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                userLikes = data;
                length = userLikes.likes.length;
                for (let i = 0; i < length; i++) {
                    if (userLikes.likes[i].id_event == event.id) {
                        setSrc(likeRed);
                    } else {
                        setSrc(like);
                    }
                }
            });
    }

    function markerAssists() {
        let userAssists = [];
        let length;
        setBtn("Unirse");
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-assist", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                userAssists = data;
                length = userAssists.assistencia.length;

                for (let i = 0; i < length; i++) {
                    if (userAssists.assistencia[i].id_event == event.id) {
                        setBtn("Unido");
                    } else {
                        setBtn("Unirse");
                    }
                }
            });
    }

    function likeEvent() {
        if (likeSrc == likeRed) {
            //si ya tiene like lo elimina, y cambia la imagen al like vacio
            setSrc(like);
            let likeFormData = new FormData();
            likeFormData.append("eventId", event.id);
            fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/delete-like", {
                method: "POST",
                body: likeFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        } else {
            //si no tiene like, lo añade y cambia la imagen
            setSrc(likeRed);
            let likeFormData = new FormData();
            likeFormData.append("eventId", event.id);
            fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/save-like", {
                method: "POST",
                body: likeFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        }
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function assistencia() {
        if (assistBtn == "Unido") {
            //si ya tiene asistencia la elimina, y cambia el botón para que esté default
            setBtn("Unirse");
            let assistFormData = new FormData();
            assistFormData.append("eventId", event.id);
            fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/delete-assist", {
                method: "POST",
                body: assistFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        } else {
            //si no tiene like, lo añade y cambia la imagen
            setBtn("Unido");
            let assistFormData = new FormData();
            assistFormData.append("eventId", event.id);
            fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/save-assist", {
                method: "POST",
                body: assistFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        }
    }

    return (
        <Marker position={JSON.parse(event.coords)} icon={customMarker}>
            <Popup>
                {/* <img src={event.img}></img> */}
                <div className='icons'>
                    <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
                    {token && (<><img className="likeSvg" id={event.id} src={likeSrc} onClick={likeEvent} ></img><span>{totalLikes.total}</span></>)}
                </div>
                <h2>{event.organizer}</h2>
                <h3>{event.name}</h3>
                <p>{event.date} - {event.hour}
                    <br></br>
                    {event.address}, {event.postal_code}, {event.city}
                </p>
                <div className='categoriesPopup'>
                    {JSON.parse(event.categories).map((category, i) =>
                        <span key={i}>{category}</span>
                    )}
                </div>
                {token && (<button className={assistBtn} onClick={assistencia}>{assistBtn}</button>)}
            </Popup>
        </Marker>
    );
}