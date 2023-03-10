import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import SpotyLogo from "../Images/Spotify-Icon.svg"
import TicketImg from "../Images/bedisco.jpg"

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [backgroundProfile, setBackground] = useState();
    const [logged, setlogged] = useState(false);
    const [connectedSpotify, setConnect] = useState(false);
    const [assists, setAssists] = useState([]);
    var redirect_uri = "http://127.0.0.1:3000/profile";
    var client_id = "0e94af801cbb46dcaa3eecb92e93f735";
    var client_secret = "3e6643485e4948bbbe6f4918651855c2";
    var access_token = null;
    var refresh_token = null;
    var body;

    useEffect(() => {
        searchTopTracks();
        dataProfile();
        fetchAssists();
    }, []);

    function dataProfile() {
        if (localStorage.getItem("profilePhoto") != null) {
            setBackground(localStorage.getItem("profilePhoto"));
            setlogged(true);
        }

        let token = getCookie("cookie_token");
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/user_profile", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }

        })
            .then(response => response.json())
            .then(data => {
                if (data.message == "Unauthenticated.") {
                    navigate('/login');
                } else {
                    let userAux = [];
                    userAux.id = data.userData.id;
                    userAux.email = data.userData.email;
                    userAux.name = data.userData.name;
                    userAux.photo = data.userData.photo + "";

                    setlogged(true);
                    setBackground(userAux.photo);
                    setUser(userAux);
                    localStorage.setItem("userId", userAux.id);
                    localStorage.setItem("profilePhoto", userAux.photo);
                }
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

    function fetchAssists() {
        let token = getCookie("cookie_token");
        let userAssists = [];
        let length;

        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/get-assist-data", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                userAssists = data;
                length = userAssists.assistData.length;
                setAssists(data);
            });
    }

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function logout() {
        let token = getCookie("cookie_token");

        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                deleteCookie("cookie_token");
                navigate('/');
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

    function searchTopTracks() {
        if (window.location.search.length > 0 || localStorage.getItem("access_token") != null) {
            setConnect(true);
            const TOKEN = "https://accounts.spotify.com/api/token";
            handleRedirect();

            function handleRedirect() {
                let code = getCode();
                if (localStorage.getItem("access_token") == null) {
                    fetchAccessToken(code);
                } else {
                    access_token = localStorage.getItem("access_token");
                    refreshTopTracks();
                }
                window.history.pushState("", "", redirect_uri);
            }

            function getCode() {
                let code = null;
                const queryString = window.location.search;
                if (queryString.length > 0) {
                    const urlParams = new URLSearchParams(queryString);
                    code = urlParams.get('code')
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
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
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
                    refreshTopTracks();
                }
                else {
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

            function refreshTopTracks() {
                body = null;
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "https://api.spotify.com/v1/me/top/tracks", true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
                xhr.send(body);
                xhr.onload = handleTopTracksResponse;
            }

            function handleTopTracksResponse() {
                if (this.status == 200) {
                    var data = JSON.parse(this.responseText);
                }
                else if (this.status == 401) {
                    refreshAccessToken()
                }
                else {
                    alert(this.responseText);
                }
            }
        }
    }

    const SpotifyButton = () => {
        if (connectedSpotify == true || localStorage.getItem("access_token") != null) {
            return (<button className="Spotify" disabled><img src={SpotyLogo}></img><p>Connected</p></button>);
        } else {
            return (<button className="Spotify" onClick={connectSpotify}><img src={SpotyLogo}></img><p>Connect Spotify</p></button>);
        }
    }

    const ShowProfile = () => {
        if (logged == true) {
            return (
                <div className="user">
                    <div className="profile">
                        <div className="profileImg" style={{ backgroundImage: `url("` + backgroundProfile + `")` }}></div>
                        <h2 className="nameProfile">{user.name}</h2>
                        <div className="button">
                            <button onClick={logout} id="logout">Logout</button>
                        </div>
                        <div className="button">
                            <SpotifyButton />
                            <div className="button">
                                <Link to="/editProfile"><button>Edit Profile</button></Link>
                            </div>
                        </div>
                    </div>
                    <p className="yourTickets">Your Tickets</p>
                    <div className="tickets">
                        {assists.length != 0 && (
                            assists.assistData.map((assist) => (
                                <div className="ticket">
                                    <img src={TicketImg} className="imageTicket">
                                    </img>
                                    <div className="textTicket">
                                        <button>Edit</button>
                                        <p className="titleTicket">{assist.organizerName}</p>
                                        <p>{assist.date} - {assist.name}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="App">
            <Header />
            <div className="divProfile">
                <ShowProfile />
            </div>
        </div>
    );
}

export default Profile;
