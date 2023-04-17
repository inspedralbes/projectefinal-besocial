import React, { useState, useEffect } from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Images/location-icon.png';
import linkSvg from '../Images/heroicons-external_link-small.svg';
import like from "../Images/like.svg";
import liked from "../Images/like-fill.svg";
import "../Pages/css/marker.css";
import ClipLoader from "react-spinners/ClipLoader";

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [32, 32],
    iconAnchor: [14, 30],
    popupAnchor: [2, -25]
});

export default function MarkerComponent({ event, token }) {
    const [readyLike, setReadyLike] = useState(false);
    const [readyLikeCount, setReadyLikeCount] = useState(false);
    const [readyAssist, setReadyAssist] = useState(false);
    const [likeSrc, setLikeSrc] = useState(like);
    const [assistBtn, setAssistBtn] = useState('Unirse');
    const [totalLikes, setTotalLikes] = useState(0);

    useEffect(() => {
        if (token) {
            markerLikes();
            markerAssists();
            getTotalLikes();
        }
    }, [event])

    function getTotalLikes() {
        let totalLikesFormData = new FormData();
        totalLikesFormData.append("eventId", event.id);
        fetch("http://127.0.0.1:8000/api/getAllLikes", {
            method: "POST",
            body: totalLikesFormData
        })
            .then(response => response.json())
            .then(data => {
                setTotalLikes(data.likes[0].total);
                setReadyLikeCount(true);
            });
    }

    function markerLikes() {
        fetch('http://127.0.0.1:8000/api/get-like', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const userLikes = data.likes;
                let isLiked = false;
                for (let i = 0; i < userLikes.length; i++) {
                    if (userLikes[i].id_event === event.id) {
                        isLiked = true;
                        break;
                    }
                }
                setLikeSrc(isLiked ? liked : like);
                setReadyLike(true);
            });
    }

    function markerAssists() {
        fetch('http://127.0.0.1:8000/api/get-assist', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const userAssists = data.assistencia;
                let isAssisted = false;
                for (let i = 0; i < userAssists.length; i++) {
                    if (userAssists[i].id_event === event.id) {
                        isAssisted = true;
                        break;
                    }
                }
                setAssistBtn(isAssisted ? 'Unido' : 'Unirse');
                setReadyAssist(true);
            });
    }

    function likeEvent() {
        if (likeSrc == liked) {
            //si ya tiene like lo elimina, y cambia la imagen al like vacio
            setLikeSrc(like);
            setTotalLikes(totalLikes - 1);
            let likeFormData = new FormData();
            likeFormData.append("eventId", event.id);
            fetch("http://127.0.0.1:8000/api/delete-like", {
                method: "POST",
                body: likeFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        } else {
            //si no tiene like, lo añade y cambia la imagen
            setLikeSrc(liked);
            setTotalLikes(totalLikes + 1);
            let likeFormData = new FormData();
            likeFormData.append("eventId", event.id);
            fetch("http://127.0.0.1:8000/api/save-like", {
                method: "POST",
                body: likeFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        }
    }

    function assistencia() {
        if (assistBtn == "Unido") {
            //si ya tiene asistencia la elimina, y cambia el botón para que esté default
            setAssistBtn("Unirse");
            let assistFormData = new FormData();
            assistFormData.append("eventId", event.id);
            fetch("http://127.0.0.1:8000/api/delete-assist", {
                method: "POST",
                body: assistFormData,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token
                }
            })
        } else {
            //si no tiene like, lo añade y cambia la imagen
            setAssistBtn("Unido");
            let assistFormData = new FormData();
            assistFormData.append("eventId", event.id);
            fetch("http://127.0.0.1:8000/api/save-assist", {
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
            {token && (readyLike && readyLikeCount && readyAssist) ? (
                <Popup>
                    <div className='icons'>
                        <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
                        <img className="likeSvg" id={event.id} src={likeSrc} onClick={likeEvent} ></img><span>{totalLikes}</span>
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
                    <button className={assistBtn} onClick={assistencia}>{assistBtn}</button>
                </Popup>
            ) : (
                <Popup>
                    <div className='icons'>
                        <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
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
                </Popup>
            )}
        </Marker>
    );
}