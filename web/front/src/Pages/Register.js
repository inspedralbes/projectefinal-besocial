import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import loading from '../Images/loading_black.gif';

export default function Register() {
  const navigate = useNavigate();

  const registerUser = (e) => {
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

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (password == confirmPassword) {
      if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
        var formDataUser = new FormData();
        formDataUser.append("name", name);
        formDataUser.append("email", email);
        formDataUser.append("password", password);
        fetch("http://besocial.alumnes.inspedralbes.cat/public/api/register", {
          method: "POST",
          body: formDataUser
        })
          .then(response => response.json())
          .then(data => {
            Swal.close();
            navigate('/login');
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'The password must contain uppercase and lowercase letters plus a special character!',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: "The password doesn't match",
      })
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