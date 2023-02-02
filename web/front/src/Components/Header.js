import React from "react";
import "../Pages/style.css";
import 'leaflet/dist/leaflet.css';
import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <div class="header">
      <Link to="/login" class="buttonLogin">Login</Link>
      <br></br>
      <Link to="/" class="buttonLogin">Home</Link>
    </div>
  );
}

export default Header;
