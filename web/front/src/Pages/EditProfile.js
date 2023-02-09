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
                    <input type="text" id="email" className="inputUpdate" name="email" placeholder={user.email}></input>

                    <label for="oldPassword" className="labelUpdate">Old Password:</label>
                    <input type="password" id="oldPw" className="inputUpdate" name="oldPassword"></input>

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