import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

function EditProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [backgroundProfile, setBackground] = useState();
    const [logged, setlogged] = useState(false);
    
    useEffect(() => {
        dataProfile();
    },[]);

    function dataProfile() {
        let token = getCookie("cookie_token");
        
        fetch("http://127.0.0.1:8000/api/user_profile", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer "+token
            }
            
          })
          .then(response => response.json())
          .then(data => {
            if (data.message == "Unauthenticated.") {
                navigate('/login');
            }else{
                let userAux = [];
                userAux.id = data.userData.id;
                userAux.email = data.userData.email;
                userAux.name = data.userData.name;
                userAux.photo = data.userData.photo+"";
                
                setlogged(true);
                setBackground(userAux.photo);
                setUser(userAux);
            }
          });
    }

    function updateUser() {
        let token = getCookie("cookie_token");
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("newPw").value;
        let confirmPassword = document.getElementById("newPwConfirm").value;    
        var validRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        var validRegexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;

        if (password == confirmPassword) {
            if (!validRegexEmail.test(email)) {
              console.log("hola");
            }
            if (validRegexEmail.test(email) && validRegexPassword.test(password)) {
              var formDataUser = new FormData();
              formDataUser.append("name", name);
              formDataUser.append("email", email);
              formDataUser.append("password", password);
              fetch("http://127.0.0.1:8000/api/update_profile", {
                method: "POST",
                body: formDataUser,
                headers: {
                  Accept: "application/json",
                  Authorization: "Bearer "+token
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                navigate('/profile');
              });
            }else{
              console.log("invalid regex");
            }
          }else{
            console.log("password doesn't match/front");
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

    return (
        <div className="App">
            <Header/>
            <div className="divProfile">
                <div className="form">
                    <label for="name" className="labelUpdate">Name:</label>
                    <input type="text" id="name" className="inputUpdate" name="name" placeholder={user.name}></input>

                    <label for="email" className="labelUpdate">Email:</label>
                    <input type="text" id="email" className="inputUpdate" name="email" defaultValue={user.email}></input>

                    <label for="newPassword" className="labelUpdate">New Password:</label>
                    <input type="password" id="newPw" className="inputUpdate" name="newPassword"></input>

                    <label for="newPasswordConfirm" className="labelUpdate">Confirm New Password:</label>
                    <input type="password" id="newPwConfirm" className="inputUpdate" name="newPasswordConfirm"></input>
                    <button id="updateProfileButton" onClick={updateUser}>Update Profile</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;