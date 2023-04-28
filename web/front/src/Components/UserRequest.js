import React, { useState, useEffect } from "react";

export default function UserRequest({ user }, { i }) {

    return (
        <div className="h-[50px]" key={i}>
            <div className="flex w-fit items-center float-left h-full">
                <div className="rounded-full w-8"><img
                    src={user.photo}
                    className="rounded-full w-8 h-8"
                ></img></div>
                <p className="font-semibold text-lg ml-4">
                    {user.name}
                </p>
            </div>
            <div className="h-full flex items-center float-right ml-5">
                {user.status == null ? (
                    <button className="border-2 btn-outline btn-primary hover:bg-violet-800 rounded-lg py-1 px-2 transition delay-30">Add Friend</button>
                ) : user.status == "pending" ? (
                    <button className="border-2 text-white bg-violet-800 rounded-lg py-1 px-2" disabled>Pending</button>
                ) : user.status == "request" ? (
                    <button className="border-2 btn-outline btn-primary hover:bg-violet-800 rounded-lg py-1 px-2 transition delay-30">Accept</button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}