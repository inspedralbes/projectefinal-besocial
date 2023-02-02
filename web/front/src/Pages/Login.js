import React from "react";
import Map from "../Components/Map";
import 'leaflet/dist/leaflet.css';
import "./style.css";
import "./login.css";
import background from "../Images/besocial.jpg";
import Header from "../Components/Header";

function Login() {
  return (
    <div className="App">
      <Header />
      <div class="divLogin">
        <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
        </div>
        <form>
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username"></input>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password"></input>

            <button>Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
