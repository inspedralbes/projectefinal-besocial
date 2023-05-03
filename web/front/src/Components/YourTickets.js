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
        let token = localStorage.getItem("cookie_token");
        //console.log("fetch assists fet");

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