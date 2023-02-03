import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/profile.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <div className="App">
      <Header />
      <div class="divProfile">
        <div class="user">
            <div class="profileImg"></div>
            <div class="buttonSpotify">
                <button>Conect Spotify</button>
            </div>
            <p>Your Tickets</p>
            <div class="tickets">
                <div class="ticket">
                    <div class="imageTicket">
                    </div>
                    <div class="textTicket">
                        <p class="titleTicket">Bedisco</p>
                        <p>18/02/2022 - Fiesta de la espuma</p>
                    </div>
                </div>
                <div class="ticket">
                    <div class="imageTicket">
                    </div>
                    <div class="textTicket">
                        <p class="titleTicket">Bedisco</p>
                        <p>18/02/2022 - Fiesta de la espuma</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
