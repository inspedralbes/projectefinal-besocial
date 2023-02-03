import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";

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
            <h3>Login</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username"></input>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password"></input>

            <button>Log In</button>
            <Link to="/register" class="registerButton">Are you not registered?</Link>
            <Link to="/profile" class="registerButton">Profile</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
