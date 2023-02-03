import React from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/login" className="buttonLogin">Login</Link>
      <Link to="/register" className="buttonRegister">Register</Link>
    </div>
  );
}

export default Header;
