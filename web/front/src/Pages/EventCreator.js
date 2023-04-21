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
                    <div className="m-auto w-fit">
                        <h1 className="text-white text-xl">Add your events</h1>
                        <form className="">
                            <label className="text-white" htmlFor="name">Name</label>
                            <input type="text" className="" name="name"></input>
                            <br></br>
                            <label className="text-white" htmlFor="date">Date</label>
                            <input type="date" className="" name="date"></input>
                            <br></br>
                            <label className="text-white" htmlFor="hour">Hour</label>
                            <input type="hour" className="" name="hour"></input>
                            <br></br>
                            <label className="text-white" htmlFor="link">Link</label>
                            <input type="text" className="" name="link"></input>
                            <br></br>
                            <label className="text-white" htmlFor="photo">Photo</label>
                            <input type="text" className="" name="photo"></input>
                            <br></br>
                            <label className="text-white" htmlFor="dayOfWeek">Day of the Week</label>
                            <input type="number" className="" name="dayOfWeek"></input>
                            <br></br>
                            <label className="text-white" htmlFor="categories">Categories</label>
                            <input type="text" className="" name="categories"></input>
                            <br></br>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
