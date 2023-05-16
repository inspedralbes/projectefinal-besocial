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

  return (
    <>
      <div className="min-h-screen">
        <div className="fixed lg:relative top-0 w-full z-[99999]">
          <Header />
        </div>
        <div className="pt-14 lg:pt-0">
          <FilterMap />
          <Friends />
        </div>
      </div>
    </>
  );
}
