import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [backgroundProfile, setBackground] = useState();
  const [logged, setlogged] = useState(false);

  let token = getCookie("cookie_token");

  useEffect(() => {
    dataProfile();
  }, []);

  function dataProfile() {
    let token = getCookie("cookie_token");

    fetch("https://servidor.besocial.alumnes.inspedralbes.cat/public/api/user_profile", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }

    })
      .then(response => response.json())
      .then(data => {
        if (data.message == "Unauthenticated.") {
          navigate('/login');
        } else {
          let userAux = [];
          userAux.id = data.userData.id;
          userAux.email = data.userData.email;
          userAux.name = data.userData.name;
          userAux.photo = data.userData.photo + "";

          setlogged(true);
          setBackground(userAux.photo);
          setUser(userAux);
        }
      });
  }

  function updateUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("newPw").value;
    let confirmPassword = document.getElementById("newPwConfirm").value;
    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if (password == confirmPassword) {
      if (!validRegexEmail.test(email)) {
        // console.log("hola");
      }
      if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
        var formDataUser = new FormData();
        formDataUser.append("name", name);
        formDataUser.append("email", email);
        formDataUser.append("password", password);
        fetch("https://servidor.besocial.alumnes.inspedralbes.cat/public/api/update-profile", {
          method: "POST",
          body: formDataUser,
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token
          }
        })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("userName", name)
            navigate('/profile');
          });
      } else {
        // console.log("invalid regex");
      }
    } else {
      // console.log("password doesn't match/front");
    }
  }

  function changePhotoPopup() {
    let link = prompt("Paste the new link");
    var formDataUser = new FormData();
    formDataUser.append("photo", link);

    fetch("https://servidor.besocial.alumnes.inspedralbes.cat/public/api/update-profile-photo", {
      method: "POST",
      body: formDataUser,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("profilePhoto", link)
        console.log(data);
    });
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
    <div className="h-screen">
      <Header />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center m-6">
        <img src={user.photo} onClick={changePhotoPopup} className="rounded-full w-26"></img>
          <div className="grid grid-cols-2 gap-6 place-content-evenly h-48 mt-16">
            <label for="name" className="text-violet-700 items-center">Name:</label>
            <input type="text" className="input input-bordered input-primary" id="name" name="name" defaultValue={user.name}></input>
            <label for="email" className="text-violet-700 items-center">Email:</label>
            <input type="text" className="input input-bordered input-primary" id="email"name="email" defaultValue={user.email}></input>
            <label for="newPassword" className="text-violet-700 items-center" >New Password:</label>
            <input type="password" className="input input-bordered input-primary" id="newPw"name="newPassword"></input>

            <label for="newPasswordConfirm" className="text-violet-700 items-center" >Confirm New Password:</label>
            <input type="password" className="input input-bordered input-primary" id="newPwConfirm" name="newPasswordConfirm"></input>
          </div>
        <button className="btn btn-outline btn-primary mt-16 bg-zinc-100" onClick={updateUser}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}