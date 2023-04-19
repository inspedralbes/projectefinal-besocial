import React, { useState, useEffect } from "react";
import TicketLike from "./TicketLike";
import loading from '../Images/loading.gif';

function YourTickets() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        fetchLikes();
    } , [])

    function fetchLikes() {
        let token = getCookie("cookie_token");

        fetch("http://besocial.alumnes.inspedralbes.cat/public/api/get-like-user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setLikes(data);
            });
        console.log(likes);
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
            {likes.length != 0 ? (
                likes.likeUser.map((like, index) => (
                <TicketLike like={like} key={index} />
                ))
            ) : (<><img className="loading" src={loading}></img></>)}
        </div>
    )
}

export default YourTickets;