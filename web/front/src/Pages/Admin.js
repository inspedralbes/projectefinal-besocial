import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "./css/style.css";

export default function Admin() {

    return (
        <>
            <div className="min-h-screen">
                <div className="fixed lg:relative top-0 w-full z-[99999]">
                    <Header />
                </div>
                <div className="w-full show flex items-center justify-center">
                    <div className="mt-10 bg-zinc-900 w-fit rounded-xl bg-zinc-900 lg:p-8 p-4">
                        <h1 className="text-zinc-100 font-semibold text-2xl mt-2">Organizers</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
