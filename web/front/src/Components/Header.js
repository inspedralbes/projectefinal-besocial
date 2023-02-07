import React from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import logo from '../Images/besocial.jpg';

function Header() {
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
}

export default Header;
