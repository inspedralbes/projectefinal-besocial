import React, { useState } from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import loading from '../Images/loading_black.gif';

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorHidden, setErrorHidden] = useState("hidden");
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
      if (password == confirmPassword) {
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
        var formDataUser = new FormData();
        formDataUser.append("name", name);
        formDataUser.append("email", email);
        formDataUser.append("password", password);
        fetch("http://127.0.0.1:8000/api/register", {
          method: "POST",
          body: formDataUser
        })
          .then(response => response.json())
          .then(data => {
            navigate('/login');
          });
      } else {
        setErrorMsg("The passwords doesn't match");
        setErrorHidden("block");
      }
    } else {
      if (!validRegexEmail.test(email) && !validRegexPassword.test(password)) {
        setErrorMsg("The password must contain uppercase and lowercase letters plus a special character and the email is incorrect!");
        setErrorHidden("block");
      } else if (!validRegexEmail.test(email)) {
        setErrorMsg("The email is incorrect!");
        setErrorHidden("block");
      } else if (!validRegexPassword.test(password)) {
        setErrorMsg("The password must contain uppercase and lowercase letters plus a special character and the email!");
        setErrorHidden("block");
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="divRegister">
        <div className="box-login">
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <div className="box-login-input">
              <input type="text" id="name" required></input>
              <label htmlFor="name">Name</label>
            </div>

            <div className="box-login-input">
              <input type="text" id="email" required></input>
              <label>Email</label>
            </div>

            <div className="box-login-input">
              <input type="password" id="password" required></input>
              <label>Password</label>
            </div>

            <div className="box-login-input">
              <input type="password" id="confirmPassword" required></input>
              <label>Confirm Password</label>
            </div>

            <div className={errorHidden + " pb-5 show"}>
              <p className="text-rose-600">{errorMsg}</p>
            </div>

            <div className="box-login-button">
              <button type="submit" className="login-button" onClick={registerUser}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                REGISTER
              </button>
            </div>
            <Link to="/login" className="change-page-button">Already have an account? Log in now</Link>
          </form>
        </div>
      </div>
    </div>
  );
}