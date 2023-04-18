import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import YourTickets from "../Components/YourTickets";
import YourLikes from "../Components/YourLikes";
import { Link } from "react-router-dom";


export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [backgroundProfile, setBackground] = useState();
    const [logged, setlogged] = useState(false);
    const [connectedSpotify, setConnect] = useState(false);
    const [buttonText, setBtnTxt] = useState('Your Tickets');
    var redirect_uri = "http://127.0.0.1:3000/profile";
    var client_id = "0e94af801cbb46dcaa3eecb92e93f735";
    var client_secret = "3e6643485e4948bbbe6f4918651855c2";
    var access_token = null;
    var refresh_token = null;
    var body;

    useEffect(() => {
        searchTopTracks();
        dataProfile();
    }, []);

    function dataProfile() {
        if (localStorage.getItem("profilePhoto") != null) {
            setBackground(localStorage.getItem("profilePhoto"));
            setlogged(true);
        }

        let token = getCookie("cookie_token");
        fetch("http://127.0.0.1:8000/api/user_profile", {
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

                    if (logged != true) {
                        setlogged(true);
                        setBackground(userAux.photo);
                    }

                    setUser(userAux);
                    localStorage.setItem("userId", userAux.id);
                    localStorage.setItem("userName", userAux.name);
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

    function deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    function logout() {
        let token = getCookie("cookie_token");

        fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                deleteCookie("cookie_token");
                localStorage.removeItem("profilePhoto");
                localStorage.removeItem("userName");
                localStorage.removeItem("userId");
                navigate('/');
            });
    }

    function changeText() {
        if(buttonText=="Your Tickets"){
            setBtnTxt('Your Likes');
        }else{
            setBtnTxt('Your Tickets');
        }
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

    return (
        <div className="App">
            <Header />
            <div className="divProfile">
                {logged ? (
                    <>
                        <div className="user">
                            <div className="profile">
                                <div className="profileImg" style={{ backgroundImage: `url("` + backgroundProfile + `")` }}></div>
                                <h2 className="nameProfile">{user.name}</h2>
                                <div className="button">
                                    <Link id="updateProfileButton" to="/editProfile"><button>Edit Profile</button></Link>
                                </div>
                                <div className="button">
                                    {connectedSpotify == true || localStorage.getItem("access_token") != null ? (
                                        <button className="Spotify" disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="27" width="27" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" fill="#191414" />
                                            </svg>
                                            <div className="SpotifyText">
                                                Connected
                                            </div>
                                        </button>
                                    ) : (
                                        <button className="Spotify" onClick={connectSpotify}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="27" width="27" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0" fill="#191414" />
                                            </svg>
                                            <div className="SpotifyText">
                                                Connect Spotify
                                            </div>
                                        </button>
                                    )}
                                </div>
                                <div className="button">
                                    <button onClick={logout} id="logout">Logout</button>
                                </div>
                            </div>
                            <div className="button">
                                <button onClick={changeText} className="yourTickets updateProfileButton">{buttonText}</button>
                            </div>
                            {buttonText == "Your Tickets" ? (
                                <YourTickets/>                          
                            ) : (
                                <YourLikes/>
                            )}
                        </div>
                    </>
                ) : (<></>)}
            </div>
        </div>
    );
}
