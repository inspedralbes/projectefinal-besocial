import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Ticket({ like, onDelete }) {
  const [diaSetmana, setDiaSetmana] = useState();
  const token = localStorage.getItem("cookie_token");



  useEffect(() => {
    if (like.dayOfWeek != null) {
      if (like.dayOfWeek == 1) {
        setDiaSetmana("Monday ");
      } else if (like.dayOfWeek == 2) {
        setDiaSetmana("Tuesday ");
      } else if (like.dayOfWeek == 3) {
        setDiaSetmana("Wednesday ");
      } else if (like.dayOfWeek == 4) {
        setDiaSetmana("Thursday ");
      } else if (like.dayOfWeek == 5) {
        setDiaSetmana("Friday ");
      } else if (like.dayOfWeek == 6) {
        setDiaSetmana("Saturday ");
      } else if (like.dayOfWeek == 0) {
        setDiaSetmana("Sunday ");
      }
    }
  }, []);

  function cancelLike() {
    const likeFormData = new FormData;
    likeFormData.append("eventId", like.id);

    fetch("http://localhost:8000/api/delete-like", {
      method: "POST",
      body: likeFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then(
      console.log("onDelete"),
      onDelete(),
    );
  }

  return (
    <div className="show card group/close h-full lg:w-96 w-[90%] bg-base-100 shadow-xl image-full transition ease-in-out delay-150 hover:scale-110 m-auto">
      <figure>
        <img src={like.photo} style={{ height: "250px", width: "100%" }}></img>
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end ">
          <button className="btn btn-square btn-sm invisible group-hover/close:visible absolute" onClick={cancelLike}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1 className="card-title text-3xl">{like.organizerName}</h1>
        <h2 className="text-xl font-medium">{like.name}</h2>
        <p>
          {like.dayOfWeek == null ? (like.date.split("-")[2] + '/' + like.date.split("-")[1]) : ('Every ' + diaSetmana)}
        </p>
        <p>{like.hour}</p>
      </div>
    </div>
  );
}
