import React from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import { Outlet, Link } from "react-router-dom";

function Header() {
  return (
    <div class="header">
      <Link to="/login" class="buttonLogin">Login</Link>
    </div>
  );
}

export default Header;
