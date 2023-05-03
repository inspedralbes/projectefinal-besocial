import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import GenreCard from "../Components/GenreCard";
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

    return (
        <div className="App min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-[90%] w-full vanish-title absolute">
                <h1 className="text-slate-100 text-4xl">Escoge tus generos favoritos</h1>
            </div>
            <form>
                <div className="p-10 grid grid-cols-4 gap-8 show-genres w-[90%] m-auto">
                    {genres.map((genre, i) => (<GenreCard key={i} genre={genre} />))}
                    <div className="m-auto"><button>Next</button></div>
                </div>
            </form>
        </div>
    );
}
