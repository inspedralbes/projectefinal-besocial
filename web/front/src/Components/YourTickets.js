import React, { useState, useEffect } from "react";
import Ticket from "./TicketAssist";
import loading from '../Images/loading.gif';

function YourTickets(params) {
    const [assists, setAssists] = useState([]);
    // const [numAssists, setNumAssists] = useState(1);

    useEffect(() => {
        fetchAssists();
    }, [])

    function fetchAssists() {
        let token = getCookie("cookie_token");
        //console.log("fetch assists fet");

        fetch("https://besocial.cat/back/public/api/get-assist-user", {
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

    // function handleAssistDelete(id) {
    //      //console.log(id);
    //     // assists.assistUser.filter(assist => assist.id != id);
    // }

    return (
        <div className="w-[90%] mx-auto grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-96 my-10">
            {assists.length != 0 ? (
                assists.assistUser.map((assist, index) => (
                    <Ticket assist={assist} key={index} onDelete={fetchAssists} />
                ))
            ) : (<><img className="h-10 w-10" src={loading}></img></>)}
        </div>
    )
}

export default YourTickets;