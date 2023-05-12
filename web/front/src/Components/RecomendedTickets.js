import React, { useState, useEffect } from "react";
import Ticket from "./TicketRecomend";

/**
 * Component per veure els tickets recomanats per els meus gustos a Spotify
 */
export default function RecomendedTickets({ topGenres }) {
    const [events, setEvents] = useState([]);
    const [assists, setAssists] = useState([]);

    useEffect(() => {
        getEvents();
        fetchAssists();
    }, []);

    function fetchAssists() {
        let token = localStorage.getItem("cookie_token");

        fetch("http://127.0.0.1:8000/api/get-assist-user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setAssists(data);
            });
    }

    /**
     * Funció que serveix per rebre tots els events actius en aquest moment
     */
    function getEvents() {
        fetch("http://127.0.0.1:8000/api/get-events", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => (filterSpotifyEvents(data.events)));
    };

    /**
     * Funció que filtra els events actius amb els meus gustos de Spotify.
     */
    function filterSpotifyEvents(totalEvents) {
        let totalEventsFiltered = totalEvents.filter(event => {
            let categories = JSON.parse(event.categories);
            return categories.some(category => topGenres.map(genre => genre.name).includes(category));
        });

        setEvents(totalEventsFiltered);
    };

    return (
        <div className="lg:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-y-4">
            {events.map((event, index) => (
                <Ticket assist={event} key={index} onDelete={fetchAssists} />
            ))}
        </div>
    )
}
