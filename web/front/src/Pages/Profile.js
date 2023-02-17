import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import SpotyLogo from "../Images/Spotify-Icon.svg"
import TicketImg from "../Images/bedisco.jpg"

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [backgroundProfile, setBackground] = useState();
    const [logged, setlogged] = useState(false);
    const [assists, setAssists] = useState([]);
    useEffect(() => {
        dataProfile();
        fetchAssists();
    }, []);

    function dataProfile() {
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

                    setlogged(true);
                    setBackground(userAux.photo);
                    setUser(userAux);
                    localStorage.setItem("userId", userAux.id);
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

        fetch("http://127.0.0.1:8000/api/get-assist-data", {
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
                console.log(data);
                setAssists(data);
            });
    }

    const ShowProfile = () => {
        if (logged == true) {
            return (
                <div className="user">
                    <div className="profile">
                        <div className="profileImg" style={{ backgroundImage: `url("` + backgroundProfile + `")` }}></div>
                        <h2 className="nameProfile">{user.name}</h2>
                        <div className="button">
                            <button className="Spotify"><img src={SpotyLogo}></img><p>Connect Spotify</p></button>
                            <div className="button">
                                <Link to="/editProfile"><button>Edit Profile</button></Link>
                            </div>
                        </div>
                    </div>
                    <p className="yourTickets">Your Tickets</p>
                    {/* Meter en un for */}
                    {assists.assistData.map((assist) => (
                        <div className="tickets">
                            <div className="ticket">
                                <img src={TicketImg} className="imageTicket">
                                </img>
                                <div className="textTicket">
                                    <button>Edit</button>
                                    <p className="titleTicket">{assist.organizerName}</p>
                                    <p>{assist.date} - {assist.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default Login;
