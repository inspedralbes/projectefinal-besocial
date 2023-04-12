import React, {useState, useEffect} from "react";
import "../Pages/css/style.css";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import logo from '../Images/beSocial.svg';
import loading from '../Images/loading.gif';

function Header() {
  const [logged, setlogged] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    userLogged();
  },[]);

  function userLogged() {
    let token = getCookie("cookie_token");

    if (token == "") {
      setlogged(false);
    }else{
      if (localStorage.getItem("profilePhoto") == null) {
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
            let userAux = [];
            userAux.photo = data.userData.photo+"";
            setUser(userAux);
            setlogged(true);
          }
        });
      }else{
        let userAux = [];
        userAux.photo = localStorage.getItem("profilePhoto");
        setUser(userAux);
        setlogged(true);
      }
    }
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

  function NavLogged(){
    if(logged){
      return <Link to="/profile" className="buttonProfile"><img src={user.photo}></img></Link>
    }else if (logged == null){
      return <img className="loading" src={loading}></img>;
    }else if (!logged) {
      return  <><Link to="/login" className="buttonLogin">Login</Link> <Link to="/register" className="buttonRegister">Register</Link></>
    }
  }

    return (
    <header>
      <div className="header">
        <a href="/"><img src={logo} alt="logo" className="logo"/></a>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <NavLogged/>
        </div>
      </div>
    </header>
  )
}

export default Header;
