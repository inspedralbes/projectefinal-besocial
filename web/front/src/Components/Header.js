import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import logo from "../Images/beSocial.png";
import loading from "../Images/loading.gif";

export default function Header() {
  const navigate = useNavigate();
  const [logged, setlogged] = useState(null);
  const [user, setUser] = useState([]);
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    userLogged();
    let token = getCookie("cookie_token");
    if (token != "") {
      fetch("https://besocial.cat/back/public/api/user-role", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserRole(data);
        });
    }
  }, []);

  function userLogged() {
    let token = getCookie("cookie_token");

    if (token == "") {
      setlogged(false);
    } else {
      if (localStorage.getItem("profilePhoto") == null) {
        fetch("https://besocial.cat/back/public/api/user-profile", {
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

    fetch("https://besocial.cat/back/public/api/logout", {
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
    localStorage.removeItem("userEmail");
    navigate('/');
  }

  function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  return (
    <header>
      <div className="navbar bg-zinc-900 h-[7vh]">
        <div className="navbar-start"></div>
        <div className="navbar-center">

          <a href="/">
            <img src={logo} alt="logo" className="w-28" />
          </a>
        </div>
        <div className="navbar-end">
          <label className="hover:scale-110 transition ease-in-out delay-150">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="badge badge-primary w-1">1</span>
          </label>
          <div className="dropdown dropdown-end mr-6 w-12 my-[0.75rem]">
            <label tabIndex={0} className="btn btn-ghost btn-square hover:scale-110 transition ease-in-out delay-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8"
                fill="#8b5cf6"
                viewBox="0 0 24 24"
                stroke="white"
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-fit min-w-[220px]"
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
                    <Link to="/profile" className="w-full">
                      <div className="flex w-fit items-center">
                        <div className="rounded-full w-16 h-16 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url("` + user.photo + `")` }}></div>
                        <p className="font-semibold text-lg ml-4">
                          {user.name}
                        </p>
                      </div>
                    </Link>
                  </li>
                  {userRole == 1 && (
                    <li onClick={() => navigate("/eventCreator")}>
                      <Link>
                        <div className="flex w-full gap-3 items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                          </svg>
                          <p>Create Event</p>
                        </div>
                      </Link>
                    </li>
                  )}
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
    </header >
  );
}
