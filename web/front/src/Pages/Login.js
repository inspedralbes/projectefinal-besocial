import React from "react";
import 'leaflet/dist/leaflet.css';
import './css/login.css';
import Header from "../Components/Header";

function Login() {
  return (
    <div className="App">
        <Header/>
        <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
        </div>
        <div className="loginForm">
            <form>
                <h3>Login</h3>

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
