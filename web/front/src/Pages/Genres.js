import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "./css/style.css";

export default function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getGenres();
    }, []);

    function getGenres() {
        fetch("http://127.0.0.1:8000/api/get-all-genres", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token")
            }
        })
            .then(response => response.json())
            .then(data => {
                setGenres(data);
            })
    }

    function applyGenres(e) {
        e.preventDefault();
    }

    return (
        <div className="App min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-[90%] w-full vanish-title absolute">
                <h1 className="text-slate-100 text-4xl">Choose your favorite genres</h1>
            </div>
            <form onSubmit={applyGenres} className="show-genres pb-5">
                <div className="m-auto w-fit pt-8"><h1 className="text-slate-100 text-4xl">Choose a maximum of 5 genres</h1></div>
                <div className="p-10 grid grid-cols-4 gap-8 w-[90%] m-auto">
                    {genres.map((genre, i) => (
                        <div className="card group/close h-[150px] w-[350px] shadow-xl m-auto">
                            <div className="bg-center bg-cover w-full h-full brightness-[0.60] blur-[1px] contrast-75 absolute z-0 rounded-md" style={{ backgroundImage: `url("` + genre.photo + `")` }}></div>
                            <div className="card-body z-50">
                                <label class="checkbox absolute">
                                    <input type="checkbox" class="checkbox-input" value={genre.id}></input>
                                    <span class="checkbox-box"></span>
                                </label>
                                <div className="mt-7 text-center w-fit m-auto"><h1 className="card-title text-3xl text-center z-1 text-slate-50">{genre.name}</h1></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="m-auto w-fit"><button type="submit" className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition delay-50">Next</button></div>
            </form>
        </div>
    );
}
