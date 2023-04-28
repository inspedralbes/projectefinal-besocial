import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";
import UserRequest from "./UserRequest.js";

export default function Friends() {
    const [buttonClass, setButtonClass] = useState("invisible");
    const [searchValue, setSearchValue] = useState('');
    const [logged, setLogged] = useState(false);
    const [searchUsers, setSearchUsers] = useState(new Array());
    const [friends, setFriends] = useState(new Array());
    let token;

    useEffect(() => {
        userLogged();
    }, []);

    function getMyFriends() {
        let friendsAux = new Array();
        fetch("http://127.0.0.1:8000/api/get-my-friends", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                let id = localStorage.getItem("userId")

                for (let i = 0; i < data.length; i++) {
                    if (data[i].id != id) {
                        friendsAux.push(data[i]);
                    }
                }
                console.log(friendsAux)
                setFriends(friendsAux)
            })

    }

    function userLogged() {
        token = getCookie("cookie_token");

        if (token == "") {
            setLogged(false);
        } else {
            setLogged(true);
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

    function handleClickedButton() {
        if (buttonClass == "invisible" || buttonClass == "vanish") {
            setButtonClass("show");
        } else {
            setButtonClass("vanish");
        }
    }

    function searchUserList() {
        let formData = new FormData();
        formData.append("name", searchValue);

        fetch("http://127.0.0.1:8000/api/search-user", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer " + getCookie("cookie_token")
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                for (let i = 0; i < data[0].original.length; i++) {
                    for (let y = 0; y < data[1].original.length; y++) {
                        if (data[0].original[i].id == data[1].original[y].id) {
                            data[0].original[i].status = "pending"
                        } else if (data[0].original[i].status == undefined) {
                            data[0].original[i].status = null;
                        }
                    }

                    for (let y = 0; y < data[2].original.length; y++) {
                        if (data[0].original[i].id == data[2].original[y].id) {
                            data[0].original[i].status = "request"
                        } else if (data[0].original[i].status == undefined) {
                            data[0].original[i].status = null;
                        }
                    }

                    for (let j = 0; j < data[3].original.length; j++) {
                        console.log(data[0].original[i].id == data[3].original[j].id);
                        if (data[0].original[i].id == data[3].original[j].id) {
                            data[0].original.slice(1, i);
                            // i--;
                            j = data[3].original.length;
                        }
                    }
                }
                setSearchUsers(data[0].original);
            });
    }

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
            <button onClick={() => handleClickedButton()} className="fixed rounded-full bg-white w-[50px] h-[50px] bottom-8 right-8 z-10 flex text-center justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
            </button>
            <div className={`${buttonClass} fixed bottom-24 right-8 z-10 p-5 bg-white rounded-lg min:w-80 w-fit text-center`}>
                {logged ? (
                    <>
                        <h1>Add friend</h1>
                        <div className="mt-1 border-2 border-slate-300 m-auto rounded-lg w-fit h-[36px] p-1 mb-3">
                            <div className="float-left mr-2 h-fit">
                                <svg className="w-[24px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input id="searchName" value={searchValue} onChange={handleSearchInputChange} className="float-left w-40 focus:outline-0 h-fit"></input>
                            <button onClick={() => searchUserList()} className="float-right h-full flex items-center hover:bg-slate-300 rounded-lg w-6 ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 px-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </button>
                        </div>
                        {searchUsers.length != 0 ? (
                            <>
                                {searchUsers.map((user, i) => (
                                    <UserRequest user={user} i={i} />
                                ))}
                            </>
                        ) : (<></>)}
                        <hr></hr>
                        <h2 className="mt-3">Friends</h2>
                    </>
                ) : (<><h1>You must be logged in to add your friends!</h1></>)}
            </div>
        </>
    );
}
