import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Friend({ user, onDelete }) {
    const navigate = useNavigate();

    function showFriendProfile() {
        navigate("/friendProfile?id=" + user.id);
    }

    function deleteFriend() {
        let token = localStorage.getItem('cookie_token');
        let friendFormData = new FormData();
        friendFormData.append('id_sender', user.id);

        fetch("http://127.0.0.1:8000/api/delete-friend", {
            method: "POST",
            body: friendFormData,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token
            }

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onDelete();
            })
    }

    return (
        // <div className="dropdown dropdown-bottom">
        //     <label tabIndex={0} className="block">
        //         <div className="h-[50px]">
        //             <div className="flex w-fit items-center float-left h-full">
        //                 <div className="rounded-full w-8 h-8 bg-center bg-cover" style={{ backgroundImage: `url("` + user.photo + `")` }}></div>
        //                 <p className="font-semibold text-lg ml-4">
        //                     {user.name}
        //                 </p>
        //             </div>
        //             <div className="h-full flex items-center float-right ml-5"></div>
        //         </div>
        //     </label>
        //     <ul tabIndex={0} className="dropdown-content menu p-1 shadow bg-base-100 rounded-box w-40 h-30 border border-slate-300 z-[999999999]">
        //         <li className="w-full" onClick={() => showFriendProfile()}><a className="text-center m-auto">Show profile</a></li>
        //         <li className="w-full" onClick={() => deleteFriend()}><a className="text-center text-red-600 m-auto">Delete friend</a></li>
        //     </ul>
        // </div>

        <div className="flex items-center min-h-[50px] cursor-pointer" onClick={() => showFriendProfile()}>
            <div className="rounded-full w-8 h-8 bg-center bg-cover" style={{ backgroundImage: `url("` + user.photo + `")` }}></div>
            <p className="font-semibold text-lg ml-4">
                {user.name}
            </p>
            <button className="btn btn-square btn-sm ml-auto" onClick={() => deleteFriend()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
            </button>
        </div>
    )
}