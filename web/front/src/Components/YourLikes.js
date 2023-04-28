import React, { useState, useEffect } from "react";
import TicketLike from "./TicketLike";
import loading from "../Images/loading.gif";

function YourTickets() {
  const [likes, setLikes] = useState([]);
  // const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    fetchLikes();
  }, []);

  function fetchLikes() {
    let token = getCookie("cookie_token");
    console.log("fetch likes fet");

    fetch("http://127.0.0.1:8000/api/get-like-user", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLikes(data);
      });
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // function handleLikeDelete() {
  //   setNumLikes(numLikes + 1);
  //   console.log("numLikes: " + numLikes);
  // }

  return (
    <div className="w-[90%] mx-auto grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-96 my-10">
      {likes.length != 0 ? (
        likes.likeUser.map((like, index) => (
          <TicketLike like={like} key={index} onDelete={fetchLikes} />
        ))
      ) : (
        <>
          <img className="h-10 w-10" src={loading}></img>
        </>
      )}
    </div>
  );
}

export default YourTickets;
