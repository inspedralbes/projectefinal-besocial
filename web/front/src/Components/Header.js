import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import logo from "../Images/beSocial.svg";
import loading from "../Images/loading.gif";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [logged, setlogged] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    userLogged();
  }, []);

  function userLogged() {
    let token = getCookie("cookie_token");

    if (token == "") {
      setlogged(false);
    } else {
      if (localStorage.getItem("profilePhoto") == null) {
        fetch("http://127.0.0.1:8000/api/user_profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message != "Unauthenticated.") {
              let userAux = [];
              userAux.photo = data.userData.photo + "";
              userAux.name = data.userData.name;
              setUser(userAux);
              setlogged(true);
            }
          });
      } else {
        let userAux = [];
        userAux.photo = localStorage.getItem("profilePhoto");
        userAux.name = localStorage.getItem("userName");
        setUser(userAux);
        setlogged(true);
      }
    }
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function logout(e) {
    let token = getCookie("cookie_token");
    
    console.log("logout");

    fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })

      deleteCookie("cookie_token");
      localStorage.removeItem("profilePhoto");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      window.location.reload();
  }

  function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  return (
    <header>
      {/* <div className="bg-zinc-900">
        <a href="/"><img src={logo} alt="logo" className="ml-6 w-12" /></a>
        <div className="">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          {logged ? (<Link to="/profile" className=""><img src={user.photo}></img></Link>) : logged == null ? (<img className="loading" src={loading}></img>)
            : !logged ? (<><Link to="/login" className="  ">Login</Link> <Link to="/register" className="buttonRegister">Register</Link></>) : (<></>)}
        </div>
      </div> */}
      <div className="navbar bg-zinc-900">
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a href="/">
            <img src={logo} alt="logo" className="w-20 mb-2" />
          </a>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end mr-6">
            <label tabIndex={0} className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10"
                fill="#18181b"
                viewBox="0 0 24 24"
                stroke="#4c1d95"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">
                  <div className="flex w-full gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    <p>Home</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <div className="flex w-full gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>

                    <p>Blog</p>
                  </div>
                </Link>
              </li>
              {logged ? (
                <>
                  <li>
                    <Link to="/profile" className="">
                      <div className="flex w-full items-center">
                        <img
                          src={user.photo}
                          className="rounded-full w-16"
                        ></img>
                        <p className="font-semibold mt-1 text-lg w-fit ml-4">
                          {user.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li onClick={logout}>
                    <Link>
                      <div className="flex w-full gap-3 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                        <p>Logout</p>
                      </div>
                    </Link>
                  </li>
                </>
              ) : logged == null ? (
                <img className="loading" src={loading}></img>
              ) : !logged ? (
                <>
                  <li>
                    <Link to="/login" className="  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                      <p>Login</p>
                    </Link>{" "}
                    <Link to="/register" className="buttonRegister">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                        />
                      </svg>
                      <p>Register</p>
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}{" "}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
