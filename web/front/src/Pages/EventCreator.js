import React from "react";
import Header from "../Components/Header";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';


export default function EventCreator() {
    return (
        <>
            <div className="h-screen">
                <Header />
                <div className="">
                    <div className="flex flex-col items-center justify-center m-6">
                        <h1 className="text-white text-xl mt-3 text-center">Add your events</h1>
                        <form className="grid grid-cols-2 gap-6 h-fit mt-3 p-8  rounded-lg">
                            <label className="text-violet-700 items-center" htmlFor="name">Name</label>
                            <input type="text" className="input input-bordered input-primary" name="name"></input>
                            <label className="text-violet-700 items-center" htmlFor="date">Date</label>
                            <input type="date" className="input input-bordered input-primary" name="date"></input>
                            <label className="text-violet-700 items-center" htmlFor="hour">Hour</label>
                            <input type="hour" className="input input-bordered input-primary" name="hour"></input>
                            <label className="text-violet-700 items-center" htmlFor="link">Link</label>
                            <input type="text" className="input input-bordered input-primary" name="link"></input>
                            <label className="text-violet-700 items-center" htmlFor="photo">Photo</label>
                            <input type="text" className="input input-bordered input-primary" name="photo"></input>
                            <label className="text-violet-700 items-center" htmlFor="dayOfWeek">Day of the Week</label>
                            <input type="number" className="input input-bordered input-primary" name="dayOfWeek"></input>
                            <label className="text-violet-700 items-center" htmlFor="categories">Categories</label>
                            <input type="text" className="input input-bordered input-primary" name="categories"></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
