import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
      var formDataUser = new FormData();
      formDataUser.append("email", email);
      formDataUser.append("password", password);

      fetch("https://servidor.besocial.alumnes.inspedralbes.cat/api/login", {
        method: "POST",
        body: formDataUser
      })
        .then(response => response.json())
        .then(data => {
          if (data != "") {
            let token = "";
            let write = false;

            for (let i = 0; i < data.token.length; i++) {
              if (write == true) {
                token += data.token.charAt(i);
              }

              if (data.token.charAt(i) == "|") {
                write = true;
              }
            }

            document.cookie = "cookie_token=" + token;
            navigate('/profile');
          }
        });
    } else {
      // console.log("incorrect credentials")
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="divLogin">
        <div className="box-login">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <div class="box-login-input">
              <input type="text" id="email" required></input>
              <label>Email</label>
            </div>

            <div class="box-login-input">
              <input type="password" id="password" required></input>
              <label>Password</label>
            </div>

            <div class="box-login-button">
              <button type="submit" class="login-button" onClick={loginUser}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                LOGIN
              </button>
            </div>
            <Link to="/register" className="change-page-button">Don't have an account? Sign in now</Link>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
