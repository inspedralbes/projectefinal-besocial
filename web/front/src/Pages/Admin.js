import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Components/Header";
import "./css/style.css";

export default function Admin() {
    const navigate = useNavigate();
    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        getOrganizers();
    }, []);

    function getOrganizers(){
        fetch("https://besocial.cat/back/publics/api/get-organizers", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token"),
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setOrganizers(data);
        });
    }

    function deleteOrganizer(id){
        let formData = new FormData();
        formData.append("id", id);

        fetch("https://besocial.cat/back/publics/api/delete-organizer", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token"),
            },
            body: formData
        })
    }

    function editOrganizer(organizer){
        localStorage.setItem("organizer", JSON.stringify(organizer));
        navigate("/editOrganizer");
    }

    return (
        <>
            <div className="min-h-screen">
                <div className="fixed lg:relative top-0 w-full z-[99999]">
                    <Header />
                </div>
                <div className="w-full show flex items-center justify-center">
                    <div className="mt-20 md:mt-10 bg-zinc-900 w-fit rounded-xl bg-zinc-900 lg:p-8 p-4 overflow-hidden">
                        <h1 className="text-zinc-100 font-semibold text-2xl mt-2 text-center pb-5">Organizers</h1>
                        <div className="overflow-auto">
                            <table className="w-full text-sm text-left dark:text-gray-400 text-slate-300">
                                <tbody>
                                {organizers.map((organizer, i) => (
                                    <tr key={i}>
                                        <td className="px-6 py-4">{organizer.name}</td>
                                        <td className="px-6 py-4">{organizer.city}</td>
                                        <td className="px-6 py-4">{organizer.coords}</td>
                                        <td className="px-6 py-4"><button onClick={() => deleteOrganizer(organizer.id)} className="h-fit bg-[#ef4444] text-slate-900 p-1 px-2 rounded-lg hover:scale-105 ease-in-out duration-150">Delete</button></td>
                                        <td className="px-6 py-4"><button onClick={() => editOrganizer(organizer)} className="h-fit bg-[#ab4bc5] text-slate-900 p-1 px-2 rounded-lg hover:scale-105 ease-in-out duration-150">Edit</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
