import React, { useState, useEffect } from "react";

export default function GenreCard({ genre }) {

    return (
        <div
            className="card group/close h-[150px] w-[350px] shadow-xl"
        >
            <div className="bg-center bg-cover w-full h-full brightness-[0.60] blur-[1px] contrast-75 absolute z-0 rounded-md" style={{ backgroundImage: `url("` + genre.photo + `")` }}></div>
            <div className="card-body z-50">
                <label class="checkbox absolute">
                    <input type="checkbox" class="checkbox-input"></input>
                    <span class="checkbox-box"></span>
                </label>
                <div className="mt-8 text-center w-fit m-auto"><h1 className="card-title text-3xl text-center z-1 text-slate-50">{genre.name}</h1></div>
            </div>
        </div>
    )
}