import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";

function Login() {
  const loginUser = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    //if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
      var formDataUser = new FormData();
      formDataUser.append("email", email);
      formDataUser.append("password", password);
      
      fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        body: formDataUser
      })
      .then(response => response.json())
      .then(data => console.log(data));
    //}
  }

  return (
    <div className="App">
      <Header />
      <div className="divLogin">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <div className="form">
          <h3>Login</h3>

          <label for="email">Email</label>
          <input type="text" placeholder="Email" id="email"></input>

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password"></input>

          <button onClick={loginUser}>Log In</button>
          <Link to="/register" className="registerButton">Don't have an account? Sign-in</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
