import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import YourTickets from "../Components/YourTickets";
import YourLikes from "../Components/YourLikes";
import RecomendedTickets from "../Components/RecomendedTickets";
import YourEvents from "../Components/YourEvents";
import Friends from "../Components/Friends";
import { Link } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("cookie_token");
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [backgroundProfile, setBackground] = useState();
  const [logged, setlogged] = useState(false);
  const [connectedSpotify, setConnect] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Your Tickets");
  const [topGenres, setTopGenres] = useState({});
  const [isTopGenres, setIsTopGenres] = useState(false);
  const [userRole, setUserRole] = useState(null);

  var redirect_uri = "http://localhost:3000/";
  var client_id = "0e94af801cbb46dcaa3eecb92e93f735";
  var client_secret = "3e6643485e4948bbbe6f4918651855c2";
  var access_token = null;
  var refresh_token = null;
  var body;

  useEffect(() => {
    searchTopArtists();
    setUserLocalData();
    dataProfile();
  }, []);

  function setUserLocalData() {
    if (localStorage.getItem("profilePhoto") != null) {
      setBackground(localStorage.getItem("profilePhoto"));
      setlogged(true);
    }

    let userAux = {};
    let info = false;
    if (localStorage.getItem("userName") != null) {
      userAux.name = localStorage.getItem("userName");
      info = true;
    }

    if (localStorage.getItem("description") != null) {
      userAux.description = localStorage.getItem("description");
      info = true;
    }

    if (info) {
      setUser(userAux);
    }
  }

  function dataProfile() {
    fetch("http://127.0.0.1:8000/api/user-profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Unauthenticated.") {
          navigate("/login");
        } else {
          let userAux = [];
          userAux.id = data.userData.id;
          userAux.email = data.userData.email;
          userAux.name = data.userData.name;
          userAux.photo = data.userData.photo + "";
          userAux.description = data.userData.description;

          if (data.userData.spotify == 0) {
            setConnect(false);
          } else {
            setConnect(true);
          }

          if (logged != true) {
            setlogged(true);
            setBackground(userAux.photo);
          }

          setUser(userAux);
          localStorage.setItem("userId", userAux.id);
          localStorage.setItem("userName", userAux.name);
          localStorage.setItem("profilePhoto", userAux.photo);
          localStorage.setItem("userEmail", userAux.email);
          localStorage.setItem("myGenres", data.userData.genres);
          localStorage.setItem("description", data.userData.description);
          localStorage.setItem("spotify", data.userData.spotify);

          fetch("http://127.0.0.1:8000/api/user-role", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setUserRole(data);
            });
        }
      });
  }

  function connectSpotify() {
    const AUTHORIZE = "https://accounts.spotify.com/authorize";

    if (access_token == null) {
      requestAuthorization();
    }

    function requestAuthorization() {
      let url = AUTHORIZE;
      url += "?client_id=" + client_id;
      url += "&response_type=code";
      url += "&redirect_uri=" + encodeURI(redirect_uri);
      url += "&show_dialog=true";
      url += "&scope=user-top-read";
      window.location.href = url;
    }
  }

  function disconnectSpotify() {
    setConnect(false);
    setIsTopGenres(false);
    localStorage.removeItem("access_token");
    localStorage.setItem("spotify", 0)
    localStorage.setItem("myGenres", "[]")
    fetch("http://127.0.0.1:8000/api/disconnect", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("cookie_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => { console.log(data) });

  }

  function searchTopArtists() {
    if (
      window.location.search.length > 0 ||
      localStorage.getItem("access_token") != null
    ) {
      const TOKEN = "https://accounts.spotify.com/api/token";
      handleRedirect();

      function handleRedirect() {
        let code = getCode();
        if (localStorage.getItem("access_token") == null) {
          fetchAccessToken(code);
        } else {
          setConnect(true);
          access_token = localStorage.getItem("access_token");
          refreshTopArtists();
        }
        window.history.pushState("", "", redirect_uri);
      }

      function getCode() {
        let code = null;
        const queryString = window.location.search;
        if (queryString.length > 0) {
          const urlParams = new URLSearchParams(queryString);
          code = urlParams.get("code");
        }
        return code;
      }

      function fetchAccessToken(code) {
        let body = "grant_type=authorization_code";
        body += "&code=" + code;
        body += "&redirect_uri=" + encodeURI(redirect_uri);
        body += "&client_id=" + client_id;
        body += "&client_secret=" + client_secret;
        callAuthorizationApi(body);
      }

      function callAuthorizationApi(body) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", TOKEN, true);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.setRequestHeader(
          "Authorization",
          "Basic " + btoa(client_id + ":" + client_secret)
        );
        xhr.send(body);
        xhr.onload = handleAuthorizationResponse;
      }

      function handleAuthorizationResponse() {
        if (this.status == 200) {
          var data = JSON.parse(this.responseText);
          var data = JSON.parse(this.responseText);
          if (data.access_token != undefined) {
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
          }
          if (data.refresh_token != undefined) {
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
          }
          refreshTopArtists();
        } else {
          alert(this.responseText);
        }
      }

      function refreshAccessToken() {
        refresh_token = localStorage.getItem("refresh_token");
        let body = "grant_type=refresh_token";
        body += "&refresh_token=" + refresh_token;
        body += "&client_id=" + client_id;
        callAuthorizationApi(body);
      }

      function refreshTopArtists() {
        body = null;
        let xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=5",
          true
        );
        xhr.setRequestHeader("Authorization", "Bearer " + access_token);
        xhr.send(body);
        xhr.onload = handleTopArtistsResponse;
      }

      function handleTopArtistsResponse() {
        if (this.status == 200) {
          var data = JSON.parse(this.responseText);
        } else if (this.status == 401) {
          refreshAccessToken();
        } else {
          alert(this.responseText);
        }

        topGenres(data);
      }

      function topGenres(data) {
        var topGen = new Array();

        for (var i = 0; i < data.items.length; i++) {
          for (let y = 0; y < data.items[i].genres.length; y++) {
            topGen.push({
              name: data.items[i].genres[y],
            });
          }
        }

        filterGenres(topGen);
      }

      function filterGenres(topGen) {
        fetch("http://127.0.0.1:8000/api/get-all-genres", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("cookie_token"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            let duplicates = [];

            for (let i = 0; i < topGen.length; i++) {
              for (let j = 0; j < data.length; j++) {
                if (
                  topGen[i].name
                    .toLowerCase()
                    .includes(data[j].name.toLowerCase())
                ) {
                  let duplicate = false;
                  let indexD;

                  for (let y = 0; y < duplicates.length; y++) {
                    if (duplicates[y].name == data[j].name) {
                      duplicate = true;
                      indexD = y;
                    }
                  }

                  if (duplicate) {
                    duplicates[indexD].count++;
                  } else {
                    duplicates.push({
                      name: data[j].name,
                      count: 1,
                    });
                  }
                }
              }
            }

            duplicates = duplicates.sort((a, b) => b.count - a.count);
            setTopGenres(duplicates);
            setIsTopGenres(true);
            saveInDB(duplicates);
          });
      }

      function saveInDB(duplicates) {
        let auxNameGenres = new Array();

        for (let i = 0; i < duplicates.length && i < 5; i++) {
          auxNameGenres[i] = duplicates[i].name;
        }

        let formData = new FormData();
        formData.append("genres", JSON.stringify(auxNameGenres));
        formData.append("spotify", 1);

        console.log("iii");

        fetch("http://127.0.0.1:8000/api/set-my-genres", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("cookie_token"),
          },
          body: formData,
        }).then((response) => {
          console.log(response);
          console.log("a");
          localStorage.setItem("myGenres", JSON.stringify(auxNameGenres));
        });
      }
    }
  }

  function handleChecked(ticket) {
    if (ticket == "Your Tickets") {
      setActiveComponent("Your Tickets");
      document.getElementById("tab1").checked = true;
    } else {
      setActiveComponent("Your Likes");
      document.getElementById("tab2").checked = true;
    }
  }

  return (
    <div className="App min-h-screen pb-2">
      <Header />
      <div className="w-full show">
        {logged && (
          <>
            <div className="mt-10 lg:p-10 p-2 w-[80%] m-auto h-fit flex flex-wrap justify-center items-center">
              <div className="w-fit sm:w-full md:w-[300px] float-left rounded-xl bg-zinc-900 lg:p-10 p-4 flex flex-wrap flex-col justify-center items-center">
                <div
                  className="rounded-full w-24 h-24 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("` + backgroundProfile + `")`,
                  }}
                ></div>
                <h2 className="text-zinc-100 font-semibold text-2xl mt-2">
                  {user.name}
                </h2>
                <h3 className="mt-[10px] text-zinc-400">{user.description}</h3>
                {userRole == 1 && (
                  <div className="flex justify-center items-center mt-6">
                    <Link
                      className="h-fit bg-[#ab4bc5] p-1 px-2 rounded-lg hover:scale-105 ease-in-out duration-150"
                      id="updateProfileButton"
                      to="/editProfile"
                    >
                      <div className="h-[30px] flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-[1.25rem] h-[1.25rem] mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                        <p className="font-medium">Edit Profile</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              {userRole != null && userRole == 0 ? (
                <div className="flex justify-center items-center h-full rounded-xl bg-zinc-900 p-8 mt-4 lg:ml-24 md:ml-4 show">
                  <div>
                    {connectedSpotify == true ||
                      localStorage.getItem("access_token") != null ? (
                      <button
                        className="group/spoti flex h-fit bg-[#1DB954] btn btn-outline hover:scale-105 ease-in-out duration-150 focus:outline-[#1DB954]"
                        onClick={disconnectSpotify}
                      >
                        <div className="h-[30px] flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="27"
                            width="27"
                            viewBox="-33.4974 -55.829 290.3108 334.974"
                            className="fill-[#1f2937] group-hover/spoti:stroke-[#1f2937] group-hover/spoti:fill-[#1DB954] group-hover/spoti:stroke-2"
                          >
                            <path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" />
                          </svg>
                          <p className="font-bold">Disconnect</p>
                        </div>
                      </button>
                    ) : (
                      <button
                        className="group/spoti flex h-fit bg-[#1DB954] btn btn-outline hover:scale-105 ease-in-out duration-150 focus:outline-[#1DB954]"
                        onClick={connectSpotify}
                      >
                        <div className="h-[30px] flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="27"
                            width="27"
                            viewBox="-33.4974 -55.829 290.3108 334.974"
                            className="fill-[#1f2937] group-hover/spoti:stroke-[#1f2937] group-hover/spoti:fill-[#1DB954] group-hover/spoti:stroke-2"
                          >
                            <path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" />
                          </svg>
                          <p className="font-bold">Connect Spotify</p>
                        </div>
                      </button>
                    )}
                    {user.name != null ? (
                      <div className="m-auto w-fit">
                        <Link
                          to="/genres"
                          className="text-slate-400 decoration-slate-400 underline underline-offset-2"
                        >
                          No tienes Spotify?
                        </Link>
                      </div>
                    ) : (
                      <></>
                    )}
                    <Link id="updateProfileButton" to="/editProfile">
                      <div className="m-auto h-fit bg-[#ab4bc5] p-1 px-2 w-fit rounded-lg hover:scale-105 ease-in-out duration-150 mt-4 h-[30px] flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-[1.25rem] h-[1.25rem] mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                        <p className="font-medium">Edit Profile</p>
                      </div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center mt-5 md:ml-32">
                  <div className="show left-0 w-full"><h2 className="mb-2 text-slate-100 ">Loading Profile</h2><div className="loader loader_bubble m-auto"></div></div>
                </div>
              )}
            </div>
            {userRole == 1 ? (
              <YourEvents />
            ) : (
              userRole != null &&
              userRole == 0 && (
                <>
                  <div className="show w-[280px] m-auto relative flex rounded-[50px] bg-[#732592] mt-5">
                    <div className="radio-inputs">
                      <label
                        className="radio"
                        onClick={() => handleChecked("Your Tickets")}
                      >
                        <input
                          type="radio"
                          id="tab1"
                          name="radio"
                          defaultChecked
                        ></input>
                        <span className="name">Your Tickets</span>
                      </label>
                      <label
                        className="radio"
                        onClick={() => handleChecked("Your Likes")}
                      >
                        <input type="radio" id="tab2" name="radio"></input>
                        <span className="name">Your Likes</span>
                      </label>
                    </div>
                  </div>
                  {activeComponent == "Your Tickets" ? (
                    <YourTickets />
                  ) : (
                    <YourLikes />
                  )}
                  {isTopGenres && (
                    <div>
                      <h1 className="text-slate-50 text-2xl text-center pt-4">
                        Events recommended by your likes on Spotify
                      </h1>
                      <RecomendedTickets topGenres={topGenres} />
                    </div>
                  )}
                </>
              )
            )}
          </>
        )}
      </div>
      <Friends />
    </div>
  );
}
