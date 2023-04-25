import React, { useState, useEffect } from "react";
import "../Pages/css/style.css";
import "leaflet/dist/leaflet.css";

export default function Friends() {
    const [buttonClass, setButtonClass] = useState("invisible");

    function handleClickedButton() {
        if (buttonClass == "invisible" || buttonClass == "vanish") {
            setButtonClass("show");
        } else {
            setButtonClass("vanish");
        }
    }

    return (
        <>
            <button onClick={() => handleClickedButton()} className="absolute rounded-full bg-white w-[50px] h-[50px] bottom-8 right-8 z-10 flex text-center justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
            </button>
            <div className={`${buttonClass} absolute bottom-24 right-8 z-10 p-5 bg-white rounded-lg w-80 text-center`}>
                <h1>Add friend</h1>
                <div className="mt-1 border-2 border-slate-300 m-auto rounded-lg w-fit h-[36px] p-1 mb-3">
                    <div className="float-left mr-2 h-fit">
                        <svg className="w-[24px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                    <input className="float-right w-40 focus:outline-0 h-fit"></input>
                </div>
                <hr></hr>
                <h2 className="mt-3">Friends</h2>
            </div>
        </>
    );
}
