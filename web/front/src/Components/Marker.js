import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerImage from "../Images/location-icon.png";
import markerImageS from "../Images/mapMarkerS.png";
import markerImageG from "../Images/mapMarkerG.png";
import linkSvg from "../Images/heroicons-external_link-small.svg";
import like from "../Images/like.svg";
import liked from "../Images/like-fill.svg";
import "../Pages/css/marker.css";
import Friend from "./Friend";

export default function MarkerComponent({ event, token }) {
  const [readyLike, setReadyLike] = useState(false);
  const [readyLikeCount, setReadyLikeCount] = useState(false);
  const [readyAssist, setReadyAssist] = useState(false);
  const [likeSrc, setLikeSrc] = useState(like);
  const [assistBtn, setAssistBtn] = useState("Join");
  const [totalLikes, setTotalLikes] = useState(0);
  const [friendsAssists, setFriendsAssists] = useState([]);
  const [friends, setFriends] = useState([]);
  const [customMarker, setCustomMarker] = useState(
    L.icon({
      iconUrl: markerImage,
      iconSize: [32, 32],
      iconAnchor: [14, 30],
      popupAnchor: [2, -25],
      className: "marker",
    })
  );

  useEffect(() => {
    if (token) {
      filterGenres();
      fetchMarkerLikes();
      fetchMarkerAssists();
      fetchTotalLikes();
      getFriendsAssist();
    }
  }, [event]);

  async function filterGenres() {
    let myGenres = JSON.parse(localStorage.getItem("myGenres"));
    let categoryEvents = JSON.parse(event.categories);
    console.log(event.categories);
    let genreRecomendation = false;

    if (myGenres != null && myGenres != undefined && myGenres != "") {
      for (let i = 0; i < myGenres.length; i++) {
        for (let y = 0; y < categoryEvents.length; y++) {
          if (myGenres[i] == categoryEvents[y]) {
            genreRecomendation = true;
          }
        }
      }

      if (genreRecomendation) {
        let setMarker;
        if (localStorage.getItem("spotify") == 1) {
          setMarker = markerImageS;
        } else {
          setMarker = markerImageG;
        }

        setCustomMarker(
          L.icon({
            iconUrl: setMarker,
            iconSize: [32, 32],
            iconAnchor: [14, 30],
            popupAnchor: [2, -25],
            className: "marker",
          })
        );
      }
    }
  }

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
    let totalLikesFormData = new FormData();
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

  function fetchFriends() {
    fetch(`http://127.0.0.1:8000/api/get-my-friends`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFriends(data);
      });
  }

  function InviteFriend(id) {
    const friendFormData = new FormData();
    friendFormData.append("id_receiver", id);
    friendFormData.append("id_event", event.id);

    fetch(`http://127.0.0.1:8000/api/send-invitation`, {
      method: "POST",
      body: friendFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Marker position={JSON.parse(event.coords)} icon={customMarker}>
      <Popup>
        <div className="card">
          <div className="absolute right-0 flex flex-col items-center">
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <img src={linkSvg} className="w-8"></img>
            </a>
            {token && readyLike && readyLikeCount && readyAssist && (
              <>
                <label onClick={fetchFriends} htmlFor="my-modal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </label>

                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal rounded-lg">
                  <div className="modal-box">
                    {friends.length == 0 ? (
                      <div className="text-center duration-500">
                        <div>
                          <svg
                            aria-hidden="true"
                            className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violet-800"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-lg">Invite a friend</h3>
                        <div className="max-h-[150px] overflow-auto scrollbar-thumb-violet-800 scrollbar-thin scrollbar-track-violet-200 scrollbar-rounded-md">
                          {friends.map((friend, i) => (
                      <div key={i}>
                              <label className="avatar items-center grid grid-cols-[50px,4fr,1fr]">
                                <img
                                  className="mask mask-circle"
                                  src={friend.photo}
                                  style={{ height: "40px", width: "40px" }}
                                ></img>
                                <p className="font-semibold text-md m-0">
                                {friend.name}
                              </p>
                        </label>
                        {!friend.assist ? (
                                <button
                                  className="border-2 btn-outline btn-primary h-10 hover:bg-violet-800 rounded-lg py-1 px-2 transition delay-30 float-right mr-4"
                                  onClick={() => InviteFriend(friend.id)}
                                >
                                  Invite
                                </button>
                        ) : (
                          <button
                            className="border-2 h-10 rounded-lg py-1 px-2 transition delay-30 float-right disabled:outline-gray-400 disabled:text-gray-400"
                            disabled
                          >
                            Invite
                                </button>
                        )}
                      </div>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="modal-action">
                      <label htmlFor="my-modal" className="btn p-2 px-2">
                        Close
                      </label>
                    </div>
                  </div>
                </div>

                <img
                  className="w-6 mr-[2px] mt-1"
                  id={event.id}
                  src={likeSrc}
                  onClick={toggleLike}
                ></img>
                <span className="mr-px">{totalLikes}</span>
              </>
            )}
          </div>
          <h2 className="text-[24px] font-bold mr-8">{event.organizer}</h2>
          <h3 className="text-[18px] font-semibold">{event.name}</h3>
          <p className="mr-8">
            {event.hour}
            <br></br>
            {event.address}, {event.postal_code}, {event.city}
          </p>
          <div className="avatar-group -space-x-4 w-fit">
            {friendsAssists.slice(0, 5).map((friend, i) => (
              <>
                <div
                  className="avatar tooltip tooltip-open"
                  data-tip={friend.name}
                >
                  <div
                    className="w-8 tooltip tooltip-open"
                    data-tip={friend.name}
                  >
                    <img
                      className="tootltip tooltip-open"
                      data-tip={friend.name}
                      src={friend.photo}
                    ></img>
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
          <div className="categoriesPopup grid grid-cols-2 gap-2 mt-4">
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
      </Popup>
    </Marker>
  );
}
