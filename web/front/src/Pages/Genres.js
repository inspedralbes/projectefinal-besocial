import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "./css/style.css";
import Swal from "sweetalert2";

export default function Genres() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [myGenres, setMyGenres] = useState([]);
    const [formClass, setFormClass] = useState("show-genres");
    const [checkClass, setCheckClass] = useState("");
    const [repeatGen, setRepeatGen] = useState(false);

    useEffect(() => {
        console.log(localStorage.getItem("myGenres"));
        if (localStorage.getItem("myGenres") == null) {
            setRepeatGen(true);
        } else {
            setRepeatGen(false);
        }

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
        let myAuxGenres = new Array();

        for (let i = 0; i < genres.length; i++) {
            let value = document.getElementById(i).value;
            let booleanValue = document.getElementById(i).checked;

            if (booleanValue == true) {
                myAuxGenres.push(value);
            }
        }

        if (myAuxGenres.length > 5 || myAuxGenres.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Choose a minimum of 2 or a maximum of 5 genres',
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000
            });
        } else {
            setMyGenres(myAuxGenres);
            checkGenres();
        }
    }

    function checkGenres() {
        setFormClass("vanish");

        setTimeout(() => {
            document.getElementById("formGenres").style.display = "none";
            document.getElementById("checkGenres").style.display = "flex";
            setCheckClass("show");
        }, 1000);
    }

    function changeGenres() {
        setCheckClass("vanish");

        setTimeout(() => {
            document.getElementById("checkGenres").style.display = "none";
            document.getElementById("formGenres").style.display = "block";
            setFormClass("show");
        }, 1000);
    }

    function finishSelection() {
        let auxNameGenres = new Array();

        for (let i = 0; i < myGenres.length; i++) {
            auxNameGenres[i] = genres[myGenres[i]].name;
        }

        let formData = new FormData();
        formData.append("genres", JSON.stringify(auxNameGenres));

        fetch("http://127.0.0.1:8000/api/set-my-genres", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token")
            },
            body: formData
        })
            .then(response => {
                localStorage.setItem("myGenres", JSON.stringify(auxNameGenres));
            });

        navigate("/profile")
    }

    function handleCheckbox(id) {
        if (document.getElementById(id).checked == true) {
            document.getElementById(id).checked = false;
        } else {
            document.getElementById(id).checked = true;
        }
    }

    return (
        <div className="App min-h-screen">
            <Header />
            {localStorage.getItem("myGenres") != null && repeatGen == false ? (
                <div className="flex items-center justify-center show h-[90%] w-full absolute">
                    <div className="w-[90%] m-auto text-center">
                        <h1 className="text-slate-100 text-4xl">You have already chosen your genres, are you sure you want to choose again?</h1>
                        <div className="m-auto w-fit mt-10">
                            <button onClick={() => navigate("/profile")} className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition delay-50">Cancel</button>
                            <button onClick={() => setRepeatGen(true)} type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition delay-50 ml-5">Yeah!</button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-center h-[90%] w-full vanish-title absolute">
                        <h1 className="text-slate-100 text-4xl">Choose your favourite genres</h1>
                    </div>
                    <form onSubmit={applyGenres} id="formGenres" className={`${formClass} pb-5`}>
                        <div className="m-auto w-fit pt-8"><h1 className="text-slate-100 text-4xl">Choose a maximum of 5 genres</h1></div>
                        {genres.length != 0 ? (
                            <div className="p-10 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 w-[90%] m-auto">
                                {genres.map((genre, i) => (
                                    <div className="card group/close h-[150px] w-[350px] shadow-xl m-auto cursor-pointer" key={i} onClick={() => handleCheckbox(i)}>
                                        <div className="bg-center bg-cover w-full h-full brightness-[0.60] blur-[1px] contrast-75 absolute z-0 rounded-md" style={{ backgroundImage: `url("` + genre.photo + `")` }}></div>
                                        <div className="card-body z-50">
                                            <label className="container-check">
                                                <input type="checkbox" id={i} value={i}></input>
                                                <div className="checkmark"></div>
                                            </label>
                                            <div className="mt-7 text-center w-fit m-auto"><h1 className="card-title text-3xl text-center z-1 text-slate-50">{genre.name}</h1></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-fit m-auto py-5">
                                <div className="loader loader_bubble"></div>
                            </div>
                        )}
                        <div className="m-auto w-fit"><button type="submit" className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition delay-50">Next</button></div>
                    </form>
                    <div id="checkGenres" className={`${checkClass} items-center justify-center h-[90%] w-full absolute hidden`}>
                        <div className="block">
                            <h1 className="text-slate-100 text-4xl pb-10">Your favorite genres:</h1>
                            <div className="grid max-w-7xl m-auto gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {myGenres.map((id, i) => (
                                    <div className="card group/close h-[150px] w-[350px] shadow-xl m-auto" key={i}>
                                        <div className="bg-center bg-cover w-full h-full brightness-[0.60] blur-[1px] contrast-75 absolute z-0 rounded-md" style={{ backgroundImage: `url("` + genres[id].photo + `")` }}></div>
                                        <div className="card-body z-50">
                                            <div className="mt-7 text-center w-fit m-auto"><h1 className="card-title text-3xl text-center z-1 text-slate-50">{genres[id].name}</h1></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="m-auto w-fit mt-10">
                                <button onClick={changeGenres} className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition delay-50">Change</button>
                                <button onClick={finishSelection} type="submit" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition delay-50 ml-5">Finish</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
