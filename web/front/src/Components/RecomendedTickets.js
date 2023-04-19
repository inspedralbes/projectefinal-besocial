import React, { useState, useEffect } from "react";

/**
 * Component per veure els tickets recomanats per els meus gustos a Spotify
 */
export default function RecomendedTickets({ topGenres }) {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        getEvents();
    }, [])

    /**
     * Funció que serveix per rebre tots els events actius en aquest moment
     */
    function getEvents() {
        fetch("https://besocial.alumnes.inspedralbes.cat/public/api/get-events", {
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
        <div className="grid grid-cols-3">
            {events.map((event, index) => (
                <div className="w-[200px] bg-white" key={index}>
                    <img src={event.img} className="imageTicket">
                    </img>
                    <div className="textTicket">
                        <button>Unirme</button>
                        <p className="titleTicket">{event.organizerName}</p>
                        <p>{event.date} - {event.name}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
