import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Friend({ user }) {
    const navigate = useNavigate();
    const [renderConfirmation, setConfirmation] = useState(false);

    function changeButton() {
        setConfirmation(false);
    }

    function showFriendProfile() {
        navigate("/friendProfile?id=" + user.id);
    }

    function deleteFriend() {
        setConfirmation(true);
        let token = localStorage.getItem('cookie_token');
        let friendFormData = new FormData();
        friendFormData.append('id_sender', user.id);

        fetch("https://besocial.cat/back/public/api/delete-friend", {
            method: "POST",
            body: friendFormData,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }

        })
            .then(response => response.json())
            .then(data => {
                //console.log(data);
            })
    }

    function cancelDelete() {
        setConfirmation(false);
    }

    function confirmDelete(id) {

    }

    useEffect(() => {
        //console.log(renderConfirmation);
    }, [renderConfirmation])

    return (
        <div onClick={changeButton} className="dropdown dropdown-top">
            <label tabIndex={0} className="block">
                <div className="h-[50px]">
                    <div className="flex w-fit items-center float-left h-full">
                        <div className="rounded-full w-8 h-8 bg-center bg-cover" style={{ backgroundImage: `url("` + user.photo + `")` }}></div>
                        <p className="font-semibold text-lg ml-4">
                            {user.name}
                        </p>
                    </div>
                    <div className="h-full flex items-center float-right ml-5"></div>
                </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-40 h-30 border border-[1px] border-slate-300">
                <li className="w-full" onClick={() => showFriendProfile()}><a className="text-center m-auto">Show profile</a></li>
                <li className="w-full" onClick={() => deleteFriend()}><a className="text-center text-red-600 m-auto">Delete friend</a></li>
                {/* { !renderConfirmation ? (
                    <li className="w-full" onClick={() => deleteFriend()}><a className="text-center text-red-600 m-auto">Delete friend</a></li>
                ) : (
                    <>
                        <li className="w-[40%]" onClick={() => confirmDelete(user.id)}><a className="text-center text-red-600 m-auto">Confirm</a></li>
                        <li className="w-[40%]" onClick={() => cancelDelete()}><a className="text-center m-auto">Cancel</a></li>
                    </>
                )} */}
            </ul>
        </div>

    )
}