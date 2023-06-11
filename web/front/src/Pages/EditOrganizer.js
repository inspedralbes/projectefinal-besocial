import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/profile.css";
import "./css/style.css";
import Header from "../Components/Header";

export default function EditProfile() {
    const navigate = useNavigate();
    const [organizer, setOrganizer] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("organizer") != null){
            setOrganizer(JSON.parse(localStorage.getItem("organizer")));
        }else{
            navigate("/admin");
        }
    }, []);

    function updateOrganizer(){
        localStorage.removeItem("organizer");

        let formData = new FormData();
        formData.append("id", organizer.id);
        formData.append("name", document.getElementById("name").value);
        formData.append("address", document.getElementById("address").value);
        formData.append("postal", document.getElementById("postal").value);
        formData.append("city", document.getElementById("city").value);
        formData.append("coords", document.getElementById("coords").value);

        fetch("https://besocial.cat/back/public/api/edit-organizer", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + localStorage.getItem("cookie_token"),
            },
            body: formData
        })
        navigate("/admin");
    }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full">
        <div className="flex flex-col items-center justify-center mt-6 mx-6 show">
          <div className="indicator">
            <input
              type="text"
              className="input input-ghost bg-opacity-0 focus:bg-opacity-0 text-white font-bold focus:text-white text-2xl text-center mt-8 outline outline-2 outline-white/10 hover:outline-white/[.05] w-80 lg:w-[22rem]"
              id="name"
              name="name"
              defaultValue={organizer.name}
            ></input>
          </div>
          <div className="grid grid-cols-2 gap-6 place-content-evenly h-48 mt-16 items-center">
          <label htmlFor="address" className="text-violet-700 items-center">
              Address:
            </label>
            <input
              type="text"
              className="input input-bordered input-primary"
              id="address"
              name="address"
              defaultValue={organizer.address}
            ></input>
            <label htmlFor="postal" className="text-violet-700 items-center">
              Postal Code:
            </label>
            <input
              type="text"
              className="input input-bordered input-primary"
              id="postal"
              name="postal"
              defaultValue={organizer.postal_code}
            ></input>
            <label htmlFor="city" className="text-violet-700 items-center">
              City:
            </label>
            <input
              type="text"
              className="input input-bordered input-primary"
              id="city"
              name="city"
              defaultValue={organizer.city}
            ></input>
            <label
              htmlFor="coords"
              className="text-violet-700 items-center"
            >
              Coords:
            </label>
            <input
              type="text"
              className="input input-bordered input-primary"
              id="coords"
              name="coords"
              defaultValue={organizer.coords}
            ></input>
          </div>
          <button
            className="btn btn-outline btn-primary mt-16 bg-zinc-100 mb-6 hover:bg-transparent"
            onClick={updateOrganizer}
          >
            Update Organizer
          </button>
        </div>
      </div>
    </div>
  );
}
