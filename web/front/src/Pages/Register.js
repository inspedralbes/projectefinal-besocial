import React from "react";
import 'leaflet/dist/leaflet.css';
import "./css/style.css";
import "./css/login.css";
import Header from "../Components/Header";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const registerUser = () => {
    console.log("hola");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    
    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (password == confirmPassword) {
      if (!validRegexEmail.test(email)) {
        console.log("hola");
      }
      if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
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
      }else{
        console.log("invalid regex");
      }
    }else{
      console.log("password doesn't match");
    }
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
          <h3>Register</h3>

          <label for="name">Name</label>
          <input type="text" placeholder="Name" id="name"></input>
          <label for="email">Email</label>
          <input type="text" placeholder="Email" id="email"></input>
          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password"></input>
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" placeholder="Password" id="confirmPassword"></input>

            <button onClick={registerUser}>Log In</button>
            <Link to="/login" className="registerButton">Already have an account? Log-in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;