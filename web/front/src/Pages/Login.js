import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <div classNameName="App">
      <Header />
      <div className="divLogin">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form>
            <h3>Login</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username"></input>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password"></input>

            <button>Log In</button>
            <Link to="/register" className="registerButton">Are you not registered?</Link>
            <Link to="/profile" className="registerButton">Profile</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
