import React, { useState, useEffect } from "react";
import linkSvg from "../Images/heroicons-external_link-small.svg";
import like from "../Images/like.svg";
import liked from "../Images/like-fill.svg";
import "leaflet/dist/leaflet.css";

export default function EventCard({ event, token }) {
  const [readyLike, setReadyLike] = useState(false);
  const [readyLikeCount, setReadyLikeCount] = useState(false);
  const [readyAssist, setReadyAssist] = useState(false);
  const [likeSrc, setLikeSrc] = useState(like);
  const [assistBtn, setAssistBtn] = useState("Unirse");
  const [totalLikes, setTotalLikes] = useState(0);
  const [friendsAssists, setFriendsAssists] = useState([]);

  useEffect(() => {
    if (token) {
      fetchMarkerLikes();
      fetchMarkerAssists();
      fetchTotalLikes();
      getFriendsAssist();
    }
  }, [event]);

  function fetchMarkerLikes() {
    fetch("http://127.0.0.1:8000/api/get-like", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userLikes = data.likes;
        let isLiked = false;
        for (let i = 0; i < userLikes.length; i++) {
          if (userLikes[i].id_event === event.id) {
            isLiked = true;
            break;
          }
        }
        setLikeSrc(isLiked ? liked : like);
        setReadyLike(true);
      });
  }

  function fetchMarkerAssists() {
    fetch("http://127.0.0.1:8000/api/get-assist", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const userAssists = data.assistencia;
        let isAssisted = false;
        for (let i = 0; i < userAssists.length; i++) {
          if (userAssists[i].id_event === event.id) {
            isAssisted = true;
            break;
          }
        }
        setAssistBtn(isAssisted ? "Joined" : "Join");
        setReadyAssist(true);
      });
  }

  function fetchTotalLikes() {
    const totalLikesFormData = new FormData();
    totalLikesFormData.append("eventId", event.id);
    fetch("http://127.0.0.1:8000/api/getAllLikes", {
      method: "POST",
      body: totalLikesFormData,
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalLikes(data.likes[0].total);
        setReadyLikeCount(true);
      });
  }

  function toggleLike() {
    const endpoint = likeSrc === liked ? "delete-like" : "save-like";
    const newLikeSrc = likeSrc === liked ? like : liked;
    const newTotalLikes = likeSrc === liked ? totalLikes - 1 : totalLikes + 1;
    setLikeSrc(newLikeSrc);
    setTotalLikes(newTotalLikes);
    const likeFormData = new FormData();
    likeFormData.append("eventId", event.id);
    fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: "POST",
      body: likeFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function toggleAssistance() {
    const endpoint = assistBtn === "Joined" ? "delete-assist" : "save-assist";
    const newAssistBtn = assistBtn === "Joined" ? "Join" : "Joined";
    setAssistBtn(newAssistBtn);
    const assistFormData = new FormData();
    assistFormData.append("eventId", event.id);
    fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
      method: "POST",
      body: assistFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getFriendsAssist() {
    const friendFormData = new FormData();
    friendFormData.append("eventId", event.id);

    fetch(`http://127.0.0.1:8000/api/get-assist-friends`, {
      method: "POST",
      body: friendFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFriendsAssists(data);
      });
  }

  return (
    <div className="card bg-base-100 min-h-[565px]">
      <figure className="h-[190px]">
        <img src={event.photo}></img>
      </figure>
      <div className="card-body p-4">
        <div className="absolute right-4 flex flex-col items-center">
          <a href={event.link} target="_blank" rel="noopener noreferrer">
            <img src={linkSvg} className="w-8"></img>
          </a>
          {token && readyLike && readyLikeCount && readyAssist && (
            <>
              <img
                className="w-6 mr-[2px]"
                id={event.id}
                src={likeSrc}
                onClick={toggleLike}
              ></img>
              <span className="mr-px text-black">{totalLikes}</span>
            </>
          )}
        </div>
        <h2 className="text-[24px] font-bold">{event.organizer}</h2>
        <h3 className="text-[18px] font-semibold">{event.name}</h3>
        <p className="text-[14px] mt-3 min-h-[65px]">
          {event.hour}
          <br></br>
          {event.address}, {event.postal_code}, {event.city}
        </p>
        <div className="avatar-group -space-x-4 w-fit">
          {friendsAssists.slice(0, 5).map((friend, i) => (
            <>
              <div className="avatar transition-all">
                <div className="w-[44px]">
                  <img src={friend.photo}></img>
                </div>
              </div>
            </>
          ))}
          {friendsAssists.length > 5 && (
            <div className="avatar placeholder">
              <div className="w-[44px] bg-violet-800 text-white font-semibold pt-1 ">
                <span>+{friendsAssists.length - 5}</span>
              </div>
            </div>
          )}
        </div>
        <div className="categoriesPopup grid grid-cols-2 gap-2 min-h-[55px]">
          {JSON.parse(event.categories).map((category, i) => (
            <span
              key={i}
              className="flex badge badge-primary bg-violet-800 badge-sm w-full h-fit p-[2px]"
            >
              {category}
            </span>
          ))}
        </div>
        {token && readyLike && readyLikeCount && readyAssist && (
          <button className={assistBtn} onClick={toggleAssistance}>
            {assistBtn}
          </button>
        )}
      </div>
    </div>
  );
}
