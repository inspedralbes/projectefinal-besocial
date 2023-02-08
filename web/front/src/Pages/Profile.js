import React, {useState, useEffect} from "react";
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";

function Login() {
    const [user, setUser] = useState([]);
    const [backgroundProfile, setBackground] = useState();

    useEffect(() => {
        dataProfile();
    },[]);

    function dataProfile() {
        let token = getCookie("cookie_token");

        fetch("http://127.0.0.1:8000/api/user_profile", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer "+token
            }
            
          })
          .then(response => response.json())
          .then(data => {
            console.log();
            if (data == undefined) {
                console.log("hola");
            }else{
                let userAux = [];
                userAux.id = data.userData.id;
                userAux.email = data.userData.email;
                userAux.name = data.userData.name;
                userAux.photo = data.userData.photo+"";
                
                setBackground(userAux.photo);
                setUser(userAux);
            }
          });
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
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
        <div className="App">
            <Header/>
            <div className="divProfile">
                <div className="user">
                    <div className="profile">
                        <div className="profileImg" style={{backgroundImage: `url("`+backgroundProfile+`")`}}></div>
                        <h2 className="nameProfile">{user.name}</h2>
                        <div className="button">
                            <button className="Spotify">Conect Spotify</button>
                        </div>
                        <div className="button">
                            <button>Edit Profile</button>
                        </div>
                    </div>
                    <p className="yourTickets">Your Tickets</p>
                    <div className="tickets">
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                        <div className="ticket">
                            <div className="imageTicket">
                            </div>
                            <div className="textTicket">
                                <p className="titleTicket">Bedisco</p>
                                <p>18/02/2022 - Fiesta de la espuma</p>
                                <button>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
