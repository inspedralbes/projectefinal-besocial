import React, { useState, useEffect } from "react";
import TicketLike from "./TicketLike";

function YourTickets() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetchLikes();
  }, []);

  function fetchLikes() {
    let token = localStorage.getItem("cookie_token");

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

  return (
    <div className="lg:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-y-5 lg:gap-y-10">
      {likes.length != 0 ? (
        likes.likeUser.length != 0 ? (
          likes.likeUser.map((like, index) => (
            <TicketLike like={like} key={index} onDelete={fetchLikes} />
          ))
        ) : (
          <p className="text-white">No likes given yet, go and give some love</p>
        )
      ) : (<div className="show absolute left-0 w-full"><div className="loader loader_bubble m-auto"></div></div>)}
    </div>
  );
}

export default YourTickets;
