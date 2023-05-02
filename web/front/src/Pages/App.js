import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FilterMap from "../Components/FilterMap";
import Header from "../Components/Header";
import Friends from "../Components/Friends";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';


export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    getSpotifyCode();
  }, []);

  function getSpotifyCode() {
    if (window.location.search.length > 0 && localStorage.getItem("cookie_token") != null) {
      let code = getCode();
      if (code != null) {
        navigate("/profile/?code=" + code);
      }
    }
  }

  function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code')
    }
    return code;
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <FilterMap />
        <Friends />
      </div>
    </>
  );
}
