import React, { useState, useEffect } from "react";
import Ticket from "./TicketAssist";
import loading from '../Images/loading.gif';

function YourTickets(params) {
    const [assists, setAssists] = useState([]);

    useEffect(() => {
        fetchAssists();
    } , [])
    
    function fetchAssists() {
        let token = getCookie("cookie_token");

        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/public/api/get-assist-user", {
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

    return (
        <div className="tickets">
            {assists.length != 0 ? (
                assists.assistUser.map((assist, index) => (
                <Ticket assist={assist} key={index} />
                ))
            ) : (<><img className="loading" src={loading}></img></>)}
        </div>
    )
}

export default YourTickets;