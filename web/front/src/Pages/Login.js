import React, { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login"
import Swal from 'sweetalert2';
import loading from '../Images/loading_black.gif';

export default function Login() {
  const navigate = useNavigate();

  const clientID = "251857813138-n689d5fdsko56tc6ihmuplc64nostpqj.apps.googleusercontent.com";

  useEffect(() => {
    Swal.close();
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      })
    }
    gapi.load("client:auth2", start);
  })

  const onSuccess = (response) => {
    //console.log(response);
    var formDataUser = new FormData();
    formDataUser.append("email", response.profileObj.email);
    formDataUser.append("name", response.profileObj.name);
    formDataUser.append("photo", response.profileObj.imageUrl);

    fetch("https://besocial.cat/back/public/api/google-login", {
      method: "POST",
      body: formDataUser
    }).then(response => response.json())
      .then(data => {
        if (data == "register") {
          fetch("https://besocial.cat/back/public/api/google-login", {
            method: "POST",
            body: formDataUser
          }).then(response => response.json())
            .then(data => {
              localStorage.setItem("cookie_token", makeToken(data.token));
              navigate('/profile');
            });
        } else {
          localStorage.setItem("cookie_token", makeToken(data.token));
          navigate('/profile');
        }
      });
  }

  const onFailure = (response) => {
    //console.log(response);
  }

  const loginUser = (e) => {
    e.preventDefault();

    Swal.fire({
      imageUrl: loading,
      width: 120,
      height: 70,
      imageWidth: 50,
      imageHeight: 50,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      showCancelButton: false,
      allowOutsideClick: false
    })

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    var formDataUser = new FormData();
    formDataUser.append("email", email);
    formDataUser.append("password", password);

    fetch("https://besocial.cat/back/public/api/login", {
      method: "POST",
      body: formDataUser
    })
      .then(response => response.json())
      .then(data => {
        if (data != false) {
          Swal.close();
          localStorage.setItem("cookie_token", makeToken(data.token));
          navigate('/profile');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect credentials',
            showCloseButton: true,
            confirmButtonText: 'Close',
          });
        }
      });
  }

  function makeToken(dataToken) {
    let token = "";
    let write = false;

    for (let i = 0; i < dataToken.length; i++) {
      if (write == true) {
        token += dataToken.charAt(i);
      }

      if (dataToken.charAt(i) == "|") {
        write = true;
      }
    }

    return token;
  }

  return (
    <div className="App">
      <Header />
      <div className="divLogin">
        <div className="box-login">
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <div className="box-login-input">
              <input type="text" id="email" required></input>
              <label>Email</label>
            </div>

            <div className="box-login-input">
              <input type="password" id="password" required></input>
              <label>Password</label>
            </div>

            <div className="box-login-button">
              <button type="submit" className="login-button" onClick={loginUser}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                LOGIN
              </button>
            </div>
            <Link to="/register" className="change-page-button">Don't have an account? Sign in now</Link>
            <div className="w-full flex justify-center mt-4">
              <GoogleLogin
                clientId={clientID}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_policity"}
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}