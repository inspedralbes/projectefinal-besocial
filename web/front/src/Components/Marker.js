import React, {useState, useEffect} from 'react'
import { Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerImage from '../Images/location-icon.png';
import linkSvg from '../Images/heroicons-external_link-small.svg';
import like from "../Images/like.svg";
import likeRed from "../Images/likeRed.png";

const customMarker = L.icon({
    iconUrl: markerImage,
    iconSize: [32, 32],
    iconAnchor: [14, 30],
    popupAnchor: [0, -30]
});


export default function MarkerComponent({ event }) {
    const [likeSrc, setSrc] = useState([]);

    useEffect(() => {
        dataMarker();
    },[]);

    function dataMarker (){
        let token = getCookie("cookie_token");
        let userLikes = [];
        let length;
        setSrc(like);

        fetch("http://127.0.0.1:8000/api/get-like", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer "+token
            }
        })
        .then(response => response.json())
        .then(data => {
            userLikes = data;
            length = userLikes.likes.length;

            for (let i = 0; i < length; i++) {
                if(userLikes.likes[i].id_event==event.id){
                    setSrc(likeRed);
                }else{
                    setSrc(like);
                }
            }
        });
        

    }

    function likeEvent(){
        if(likeSrc==likeRed){
            setSrc(like);
        }else{
            setSrc(likeRed);
            let token = getCookie("cookie_token");
            
            var likeFormData = new FormData();
            likeFormData.append("eventId", event.id);
            fetch("http://127.0.0.1:8000/api/save-like", {
              method: "POST",
              body: likeFormData,
              headers: {
                Accept: "application/json",
                Authorization: "Bearer "+token
              }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
        }
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
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

    return (
        <Marker position={JSON.parse(event.coords)} icon={customMarker}>
            <Popup>
                {/* <img src={event.img} alt="Foto event" width="300px" /> */}
                <a href={event.link} target="_blank" rel="noopener noreferrer"><img src={linkSvg} className="linkSvg"></img></a>
                <h1>{event.organizer}</h1>
                <h3>{event.name}</h3>
                <img className="likeSvg" id={event.id} src={likeSrc} onClick={likeEvent} ></img>
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