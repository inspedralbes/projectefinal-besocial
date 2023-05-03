import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Friend({ user }) {

    return (
        <Link to={"/friendProfile?id="+user.id}>
            <div className="h-[50px]">
                <div className="flex w-fit items-center float-left h-full">
                    <div className="rounded-full w-8 h-8 bg-center bg-cover" style={{ backgroundImage: `url("` + user.photo + `")` }}></div>
                    <p className="font-semibold text-lg ml-4">
                        {user.name}
                    </p>
                </div>
                <div className="h-full flex items-center float-right ml-5"></div>
            </div>
        </Link>
    )
}