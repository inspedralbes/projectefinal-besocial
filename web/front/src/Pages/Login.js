import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import loading from '../Images/loading_black.gif';

export default function Login() {
  const navigate = useNavigate();

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

    fetch("http://besocial.alumnes.inspedralbes.cat/public/api/login", {
      method: "POST",
      body: formDataUser
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data != false) {
          Swal.close();
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
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Your user does not exist!',
            showCloseButton: true,
            confirmButtonText: 'Register',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/register');
            }
          });
        }
      });
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
          </form>
        </div>

      </div>
    </div>
  );
}