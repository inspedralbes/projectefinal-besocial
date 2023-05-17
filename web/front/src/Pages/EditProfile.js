import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  let token = localStorage.getItem("cookie_token");

  useEffect(() => {
    dataProfile();
  }, []);

  function dataProfile() {
    let userAux = [];
    userAux.id = localStorage.getItem("userId");
    userAux.email = localStorage.getItem("userEmail");
    userAux.name = localStorage.getItem("userName");
    userAux.description = localStorage.getItem("description");
    userAux.photo = localStorage.getItem("profilePhoto");
    setUser(userAux);
    fetch("http://127.0.0.1:8000/api/user-profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.userData.id != userAux.id) {
          userAux.id = data.userData.id;
        }
        if(data.userData.email != userAux.email) {
          userAux.email = data.userData.email;
        }
        if(data.userData.name != userAux.name) {
          userAux.name = data.userData.name;
        }
        if(data.userData.description != userAux.description) {
          userAux.description = data.userData.description;
        }
        if(data.userData.photo != userAux.photo) {
          userAux.photo = data.userData.photo;
        }
        setUser(userAux);
      });
  }

  function checkPasswords(password, confirmPassword) {
    let regex;
    var validRegexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (password != null || password != "") {
      if (password == confirmPassword) {
        if (validRegexPassword.test(password)) {
          regex = true;
          console.log("Invalid password regex");
        }
      } else {
        console.log("Password doesn't match");
      }
    }

    return regex;
  }

  function updateUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let description = document.getElementById("description").value;
    let password = document.getElementById("newPw").value;
    let confirmPassword = document.getElementById("newPwConfirm").value;
    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regexPw = checkPasswords(password, confirmPassword);

    if (validRegexEmail.test(email)) {
      var formDataUser = new FormData();
      formDataUser.append("name", name);
      formDataUser.append("email", email);
      formDataUser.append("description", description);
      if (regexPw) formDataUser.append("password", password);
      fetch("http://127.0.0.1:8000/api/update-profile", {
        method: "POST",
        body: formDataUser,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("description", description);
          navigate("/profile");
        });
    } else {
      console.log("invalid email regex");
    }
  }

  function changePhotoPopup() {
    let link = document.getElementById("newPfp").value;
    if (link != null && link.split("//")[0] == "https:") {
      var formDataUser = new FormData();
      formDataUser.append("photo", link);

      fetch("http://127.0.0.1:8000/api/update-profile-photo", {
        method: "POST",
        body: formDataUser,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("profilePhoto", link);
        });
    } else {
      console.log("Link must start with https");
    }
  }



  return (
    <div className="h-screen">
      <Header />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center m-6 show">
          <div className="avatar indicator rounded-full group/pfp ">
            <label htmlFor="my-modal3">
              <div
                className="flex w-[300px] h-[300px] rounded-full bg-zinc-800 bg-opacity-70 absolute invisible group-hover/pfp:visible"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#ffffff"
                  className="w-12 h-12 m-[auto] mt-32"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </div>
              <div className="w-26">
                <img
                  src={user.photo}
                  className="rounded-full w-fit"
                  style={{ width: "300px", height: "300px" }}
                ></img>
              </div>
            </label>
            <input
              type="checkbox"
              id="my-modal3"
              className="modal-toggle"
            ></input>
            <label htmlFor="my-modal3" className="modal cursor-pointer">
              <label className="modal-box relative flex flex-wrap" htmlFor="">
                <h1 className="font-semibold mb-2">
                  Paste the URL of your new profile picture:
                </h1>
                <input
                  type="text"
                  className="input input-bordered input-primary w-full"
                  placeholder="New image URL"
                  id="newPfp"
                ></input>
                <button className="btn btn-outline btn-primary mt-2" onClick={changePhotoPopup}>Save</button>
                <div className="alert shadow-lg mt-2 h-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span className="text-sm">click anywhere to close this window.</span>
                  </div>
                </div>
              </label>
            </label>
          </div>

          <div className="indicator">
            <input
              type="text"
              className="input input-ghost bg-opacity-0 focus:bg-opacity-0 text-white font-bold focus:text-white text-2xl text-center mt-8 outline outline-2 outline-white/10 hover:outline-white/[.05] w-80 lg:w-[22rem]"
              id="name"
              name="name"
              defaultValue={user.name}
            ></input>
          </div>
          <div className="indicator">
            <input
              type="text"
              className="input input-ghost bg-opacity-0 focus:bg-opacity-0 text-white focus:text-white text-[14px] text-center mt-8 outline outline-2 outline-white/10 hover:outline-white/[.05] w-[350px] lg:w-[480px]"
              id="description"
              name="name"
              defaultValue={user.description}
            ></input>
          </div>

          <div className="grid grid-cols-2 gap-6 place-content-evenly h-48 mt-16 items-center">
            <label for="email" className="text-violet-700 items-center">
              Email:
            </label>
            <input
              type="text"
              className="input input-bordered input-primary"
              id="email"
              name="email"
              defaultValue={user.email}
            ></input>
            <label for="newPassword" className="text-violet-700 items-center">
              New Password:
            </label>
            <input
              type="password"
              className="input input-bordered input-primary"
              id="newPw"
              name="newPassword"
            ></input>

            <label
              for="newPasswordConfirm"
              className="text-violet-700 items-center"
            >
              Confirm New Password:
            </label>
            <input
              type="password"
              className="input input-bordered input-primary"
              id="newPwConfirm"
              name="newPasswordConfirm"
            ></input>
          </div>
          <button
            className="btn btn-outline btn-primary mt-16 bg-zinc-100"
            onClick={updateUser}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
