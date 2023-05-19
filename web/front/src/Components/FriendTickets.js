import React, { useState, useEffect } from "react";
import Ticket from "./FriendTicketAssist";

export default function FriendTickets({ id_user }) {
    const [assists, setAssists] = useState([]);

    useEffect(() => {
        fetchAssists();
    }, [])

    function fetchAssists() {
        let token = localStorage.getItem("cookie_token");
        //console.log("fetch assists fet");
        let friendData = new FormData();
        friendData.append('id_user', id_user)
        fetch("https://besocial.cat/back/public/api/get-assist-friend", {
            method: "POST",
            body: friendData,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setAssists(data);
            });
    }

    return (
        <div className="w-[90%] mx-auto grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-18 lg:gap-20 gap-6 my-10">
            {assists.length != 0 ? (
                assists.assistUser.map((assist, index) => (
                    <Ticket assist={assist} key={index} />
                ))
            ) : (<div className="show absolute left-0 w-full"><div className="loader loader_bubble m-auto"></div></div>)}
        </div>
    )
}