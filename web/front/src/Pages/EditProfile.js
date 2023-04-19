import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  let token = getCookie("cookie_token");

  useEffect(() => {
    dataProfile();
  }, []);

  function dataProfile() {
    let userAux = [];
    userAux.id = localStorage.getItem('userId');
    userAux.email = localStorage.getItem('userEmail');
    userAux.name = localStorage.getItem('userName');
    userAux.photo = localStorage.getItem('profilePhoto');

    setUser(userAux);

  }

  function checkPasswords(password, confirmPassword) {
    let regex;
    var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

    if(password!=null || password!=""){
      if (password == confirmPassword) {
        if (validRegexPassword.test(password)) {
          regex = true;
          console.log("Invalid password regex");
        }
      }else{
        console.log("Password doesn't match");
      }
    }

    return regex
  }

  function updateUser() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("newPw").value;
    let confirmPassword = document.getElementById("newPwConfirm").value;
    var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var regexPw = checkPasswords(password, confirmPassword);

    if (validRegexEmail.test(email)) {
      var formDataUser = new FormData();
      formDataUser.append("name", name);
      formDataUser.append("email", email);
      if (regexPw) formDataUser.append("password", password);
      fetch("http://127.0.0.1:8000/api/update-profile", {
        method: "POST",
        body: formDataUser,
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        }
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          navigate('/profile');
        });
    } else {
      console.log("invalid email regex");
    }
  }

  function changePhotoPopup() {
    let link = prompt("Paste the new link");
    console.log(link.split('//')[0]);
    if (link != null && link.split('//')[0] == 'https:') {
      var formDataUser = new FormData();
      formDataUser.append("photo", link);

      fetch("http://127.0.0.1:8000/api/update-profile-photo", {
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
    } else {
      console.log("No photo provided");
    }
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
          <div className="w-26">
            <img src={user.photo} onClick={changePhotoPopup} className="rounded-full w-fit" style={{ width: '300px', height: '300px' }}></img>
          </div>
          <div className="grid grid-cols-2 gap-6 place-content-evenly h-48 mt-16">
            <label for="name" className="text-violet-700 items-center">Name:</label>
            <input type="text" className="input input-bordered input-primary" id="name" name="name" defaultValue={user.name}></input>
            <label for="email" className="text-violet-700 items-center">Email:</label>
            <input type="text" className="input input-bordered input-primary" id="email" name="email" defaultValue={user.email}></input>
            <label for="newPassword" className="text-violet-700 items-center" >New Password:</label>
            <input type="password" className="input input-bordered input-primary" id="newPw" name="newPassword"></input>

            <label for="newPasswordConfirm" className="text-violet-700 items-center" >Confirm New Password:</label>
            <input type="password" className="input input-bordered input-primary" id="newPwConfirm" name="newPasswordConfirm"></input>
          </div>
          <button className="btn btn-outline btn-primary mt-16 bg-zinc-100" onClick={updateUser}>Update Profile</button>
        </div>
      </div>
    </div>
  );
}