import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Friend({ user, onDelete }) {
    const navigate = useNavigate();

    function showFriendProfile() {
        navigate("/friendProfile?id=" + user.id);
    }

    function deleteFriend() {
        let token = localStorage.getItem("cookie_token");
        let friendFormData = new FormData();
        friendFormData.append("id_sender", user.id);

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
                onDelete();
            })
    }

    function blockUser() {
        let token = localStorage.getItem("cookie_token");
        let blockFormData = new FormData();
        blockFormData.append("id_blocked", user.id);
        
        fetch("https://besocial.cat/back/public/api/block-user", {
            method: "POST",
            body: blockFormData,
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                
            });

        deleteFriend();
    }
    return (
        <div className="flex items-center min-h-[50px]">
            <div
                onClick={() => showFriendProfile()}
                className="rounded-full w-8 h-8 bg-center bg-cover cursor-pointer"
                style={{ backgroundImage: `url("` + user.photo + `")` }}
            ></div>
            <p
                onClick={() => showFriendProfile()}
                className="font-semibold text-lg ml-4 cursor-pointer"
            >
                {user.name}
            </p>
            <a href={`#my_modal_`+user.id} className="btn btn-square btn-sm ml-auto">
                {" "}
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
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
                </svg>
            </a>

            <div className="modal" id={`my_modal_`+user.id}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Would you like to delete and block this user?</p>
                    <div className="rounded-full w-24 h-24 bg-center bg-cover cursor-pointer flex justify-center m-auto mt-1" style={{ backgroundImage: `url("` + user.photo + `")` }}>ç
                    </div>
                    <p className="font-semibold text-lg ml-4 cursor-pointer">
                        {user.name}
                    </p>
                    <div className="modal-action w-fit inline-grid grid-cols-3 justify-items-center">
                        <a href="#" className="btn bg-red-700 border-0" onClick={() => blockUser()}>
                            Block & delete
                        </a>
                        <a href="#" className="btn w-[90%] border-0 bg-amber-300 m-auto" onClick={() => deleteFriend()}>
                            Delete only
                        </a>
                        <a href="#" className="btn w-[80%] border-0">
                            Cancel
                        </a>
                </div>
                </div>
            </div>
        </div>
    );
}
