import React, {useState, useEffect} from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import logo from '../Images/besocial.jpg';

function Header() {
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    userLogged();
  },[]);

  function userLogged() {
    let token = getCookie("cookie_token");
    
    fetch("http://127.0.0.1:8000/api/user_profile", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer "+token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message != "Unauthenticated.") {
           setlogged(true);
        }
      });
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  if (!logged) {
    return (
      <header>
        <div className="header">
          <a href="/"><img src={logo} alt="logo" /></a>
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/login" className="buttonLogin">Login</Link>
            <Link to="/register" className="buttonRegister">Register</Link>
          </div>
        </div>
      </header>
    )
  }else{
    return (
      <header>
        <div className="header">
          <a href="/"><img src={logo} alt="logo" /></a>
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/profile" className="buttonProfile">Profile</Link>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
