import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <div classNameName="App">
      <Header />
      <div className="divProfile">
        <div className="user">
            <div className="profile">
                <div className="profileImg"></div>
                <div className="buttonSpotify">
                    <button>Conect Spotify</button>
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
