import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ assist }) {
    const [diaSetmana, setDiaSetmana] = useState();
    const token = localStorage.getItem("cookie_token");
    const [assistBtn, setAssistBtn] = useState("Join");
    const [readyAssist, setReadyAssist] = useState(false);

    useEffect(() => {
        if (assist.dayOfWeek != null) {
            if (assist.dayOfWeek == 1) {
                setDiaSetmana("Monday ");
            } else if (assist.dayOfWeek == 2) {
                setDiaSetmana("Tuesday ");
            } else if (assist.dayOfWeek == 3) {
                setDiaSetmana("Wednesday ");
            } else if (assist.dayOfWeek == 4) {
                setDiaSetmana("Thursday ");
            } else if (assist.dayOfWeek == 5) {
                setDiaSetmana("Friday ");
            } else if (assist.dayOfWeek == 6) {
                setDiaSetmana("Saturday ");
            } else if (assist.dayOfWeek == 0) {
                setDiaSetmana("Sunday ");
            }
        }
        fetchMarkerAssists();
    }, []);

    function fetchMarkerAssists() {
        fetch("http://127.0.0.1:8000/api/get-assist", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const userAssists = data.assistencia;
                let isAssisted = false;
                for (let i = 0; i < userAssists.length; i++) {
                    if (userAssists[i].id_event === assist.id) {
                        isAssisted = true;
                        break;
                    }
                }
                setAssistBtn(isAssisted ? "Joined" : "Join");
                setReadyAssist(true);
            });
    }

    function toggleAssistance() {
        const endpoint = assistBtn === "Joined" ? "delete-assist" : "save-assist";
        const newAssistBtn = assistBtn === "Joined" ? "Join" : "Joined";
        setAssistBtn(newAssistBtn);
        const assistFormData = new FormData();
        assistFormData.append("eventId", assist.id);
        fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
            method: "POST",
            body: assistFormData,
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return (
        <div className="show card group/close h-full lg:w-96 w-[90%] bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110 m-auto z-0">
            <figure>
                <img src={assist.photo} style={{ height: "250px", width: "100%" }}></img>
            </figure>
            <div className="card-body">
                <h1 className="card-title text-3xl">{assist.organizer}</h1>
                <h2 className="text-xl font-medium">{assist.name}</h2>
                <p>
                    {assist.dayOfWeek == null ? (assist.date.split("-")[2] + '/' + assist.date.split("-")[1]) : ('Every ' + diaSetmana)}
                </p>
                <p>{assist.hour}</p>
                <button className={assistBtn + " mt-0 py-2 px-3"} onClick={toggleAssistance}>
                    {assistBtn}
                </button>
            </div>
        </div>
    );
}
