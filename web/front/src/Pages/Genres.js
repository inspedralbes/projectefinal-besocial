import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "./css/style.css";
import Swal from "sweetalert2";

export default function Genres() {
    const [genres, setGenres] = useState([]);
    const [myGenres, setMyGenres] = useState([]);
    const [formClass, setFormClass] = useState("show-genres");
    const [checkClass, setCheckClass] = useState("");

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
        let myAuxGenres = new Array();

        for (let i = 0; i < genres.length; i++) {
            let value = document.getElementById(i).value;
            let booleanValue = document.getElementById(i).checked;

            if (booleanValue == true) {
                myAuxGenres.push(value);
            }
        }

        if (myAuxGenres.length > 5) {
            Swal.fire({
                icon: 'error',
                title: 'Choose a maximum of 5 genres',
                showCloseButton: true,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500
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
        console.log(localStorage.getItem("cookie_token"))

        fetch("http://127.0.0.1:8000/api/set-my-genres", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token")
            },
            body: JSON.stringify(auxNameGenres)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }


    return (
        <div className="App min-h-screen">
            <Header />
            <div className="flex items-center justify-center h-[90%] w-full vanish-title absolute">
                <h1 className="text-slate-100 text-4xl">Choose your favorite genres</h1>
            </div>
            <form onSubmit={applyGenres} id="formGenres" className={`${formClass} pb-5`}>
                <div className="m-auto w-fit pt-8"><h1 className="text-slate-100 text-4xl">Choose a maximum of 5 genres</h1></div>
                {genres.length != 0 ? (
                    <div className="p-10 grid grid-cols-4 gap-8 w-[90%] m-auto">
                        {genres.map((genre, i) => (
                            <div className="card group/close h-[150px] w-[350px] shadow-xl m-auto" key={i}>
                                <div className="bg-center bg-cover w-full h-full brightness-[0.60] blur-[1px] contrast-75 absolute z-0 rounded-md" style={{ backgroundImage: `url("` + genre.photo + `")` }}></div>
                                <div className="card-body z-50">
                                    <label className="checkbox absolute">
                                        <input type="checkbox" className="checkbox-input" id={i} value={i}></input>
                                        <span className="checkbox-box"></span>
                                    </label>
                                    <div className="mt-7 text-center w-fit m-auto"><h1 className="card-title text-3xl text-center z-1 text-slate-50">{genre.name}</h1></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-fit m-auto py-5">
                        <div>
                            <svg
                                aria-hidden="true"
                                className="inline w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-violet-800"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        </div>
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
        </div>
    );
}
