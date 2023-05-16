import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import "./css/style.css";
import 'leaflet/dist/leaflet.css';
import Swal from 'sweetalert2';

export default function EventCreator() {
    const token = localStorage.getItem("cookie_token");

    const [orgCreated, setOrgCreated] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/organizer-created", {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => response.json())
            .then((data) => {
                setOrgCreated(data);
            });
    }, []);

    const [orgName, setOrgName] = useState("");
    const [orgAddress, setOrgAddress] = useState("");
    const [orgPostalCode, setOrgPostalCode] = useState("");
    const [orgCity, setOrgCity] = useState("");
    const [orgCoordinates, setOrgCoordinates] = useState("");

    const name = (event) => {
        setOrgName(event.target.value);
    };

    const address = (event) => {
        setOrgAddress(event.target.value);
    };

    const postalCode = (event) => {
        setOrgPostalCode(event.target.value);
    };

    const city = (event) => {
        setOrgCity(event.target.value);
    };

    const coordinates = (event) => {
        setOrgCoordinates("[" + event.target.value + "]");
    };

    const addOrganizer = () => {
        const formData = new FormData();
        formData.append("name", orgName);
        formData.append("address", orgAddress);
        formData.append("postal_code", orgPostalCode);
        formData.append("city", orgCity);
        formData.append("coords", orgCoordinates);
        fetch("http://127.0.0.1:8000/api/create-organizer", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }).then((response) => response.json())
            .then((data) => {
                if (typeof data == "number") {
                    setOrgCreated(true);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect data',
                        showCloseButton: true,
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 2000
                    });
                }
            });
    };

    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventHour, setEventHour] = useState("");
    const [eventLink, setEventLink] = useState("");
    const [eventPhoto, setEventPhoto] = useState("");
    const [eventDayOfWeek, setEventDayOfWeek] = useState("");
    const [eventCategories, setEventCategories] = useState("");

    const eName = (event) => {
        setEventName(event.target.value);
    };

    const date = (event) => {
        setEventDate(event.target.value);
    };

    const hour = (event) => {
        setEventHour(event.target.value);
    };

    const link = (event) => {
        setEventLink(event.target.value);
    };

    const photo = (event) => {
        setEventPhoto(event.target.value);
    };

    const dayOfWeek = (event) => {
        setEventDayOfWeek(event.target.value);
    };

    const categories = (event) => {
        const categories = event.target.value.split(", ");
        let categoriesString = "";
        categories.forEach(element => categoriesString += '"' + element + '", ');
        setEventCategories("[" + categoriesString.slice(0, -2) + "]");
    };

    const addEvent = () => {
        const formData = new FormData();
        formData.append("name", eventName);
        formData.append("date", eventDate);
        formData.append("hour", eventHour);
        formData.append("link", eventLink);
        formData.append("photo", eventPhoto);
        formData.append("dayOfWeek", eventDayOfWeek);
        formData.append("categories", eventCategories);
        fetch("http://127.0.0.1:8000/api/create-event", {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }).then((response) => response.json())
            .then((data) => {
                if (typeof data == "number") {
                    document.querySelector("#addEventForm input[name='name']").value = "";
                    document.querySelector("#addEventForm input[name='date']").value = "";
                    document.querySelector("#addEventForm input[name='hour']").value = "";
                    document.querySelector("#addEventForm input[name='link']").value = "";
                    document.querySelector("#addEventForm input[name='photo']").value = "";
                    document.querySelector("#addEventForm select[name='dayOfWeek']").value = "";
                    document.querySelector("#addEventForm input[name='categories']").value = "";
                    Swal.fire({
                        icon: 'success',
                        title: 'Event created',
                        showCloseButton: true,
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect data',
                        showCloseButton: true,
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 2000
                    });
                }
            });
    };

    return (
        <div className="min-h-[100vh]">
            <Header />
            {!orgCreated ? (
                <div className="flex flex-col items-center justify-center mt-12">
                    <h1 className="text-white text-3xl mt-3 text-center">Create your organization</h1>
                    <div className="grid lg:grid-cols-2 lg:gap-6 h-fit mt-3 p-4 lg:p-8 rounded-lg">
                        <label className="text-violet-700 items-center flex" htmlFor="name">Name</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Organizer name">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="name" onChange={name}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="address">Address</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Organizer address">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="address" onChange={address}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="postal-code">Postal code</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Organizer postal code">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="postal-code" onChange={postalCode}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="city">City</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Organizer city">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="city" onChange={city}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="cordinates">Coordinates</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Organizer coordinates (enter Google Maps, search for your location, right click on it and choose the first option to obtain the coordinates)">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="cordinates" placeholder="41.390205, 2.154007" onChange={coordinates}></input>
                        </div>
                    </div>
                    <button type="submit" className="login-button" onClick={addOrganizer}>Add organization</button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-12">
                    <h1 className="text-white text-3xl mt-3 text-center">Create your events</h1>
                    <div className="grid lg:grid-cols-2 lg:gap-6 h-fit mt-3 p-4 lg:p-8 rounded-lg" id="addEventForm">
                        <label className="text-violet-700 items-center flex" htmlFor="name">Name</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Event name">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="name" onChange={eName}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="date">Date</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Date of the event (if it is repetitive, inform the initial date)">
                            <input type="date" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="date" onChange={date}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="hour">Hour</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Start and end time of the event">
                            <input type="hour" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="hour" onChange={hour}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="link">Link</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Link to the event">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="link" onChange={link}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="photo">Photo</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Event photo link">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="photo" onChange={photo}></input>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="dayOfWeek">Day of the Week</label>
                        <div className="tooltip lg:tooltip-right" data-tip="If the event is repetitive, choose the day for the repetition">
                            <select className="select select-primary text-violet-700 mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="dayOfWeek" onChange={dayOfWeek}>
                                <option value=""></option>
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                                <option value="7">Sunday</option>
                            </select>
                        </div>
                        <label className="text-violet-700 items-center flex" htmlFor="categories">Categories</label>
                        <div className="tooltip lg:tooltip-right" data-tip="Write the categories of the event separated by commas">
                            <input type="text" className="input input-bordered input-primary mb-4 lg:mb-0 mt-1 lg:mr-1 w-[99%]" name="categories" placeholder="Category 1, Category 2" onChange={categories}></input>
                        </div>
                    </div>
                    <button type="submit" className="login-button" onClick={addEvent}>Add event</button>
                </div>
            )}
        </div>
    );
}
