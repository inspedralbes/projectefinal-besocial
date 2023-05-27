import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import FriendTickets from "../Components/FriendTickets";

export default function Profile() {
  const navigate = useNavigate();
  const [friend, setFriend] = useState([]);
  const [backgroundProfile, setBackground] = useState();
  const [carouselLoading, setCarouselLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("cookie_token");
    dataProfile(token);
  }, []);

  function dataProfile(token) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let friendFormData = new FormData();
    let id = urlParams.get("id");
    friendFormData.append("id", id);

    fetch("https://besocial.cat/back/public/api/get-friend-profile", {
      method: "POST",
      body: friendFormData,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Unauthenticated.") {
          navigate("/login");
        } else {
          let friendAux = [];
          friendAux.id = data.userData.id;
          friendAux.description = data.userData.description;
          friendAux.email = data.userData.email;
          friendAux.name = data.userData.name;
          friendAux.photo = data.userData.photo + "";

          setBackground(friendAux.photo);
          setCarouselLoading(false);
          setFriend(friendAux);
        }
      });
  }

  return (
    <div className="md:min-h-screen">
      <Header />
      <div className="flex w-100">
        {carouselLoading ? (
          <div className="flex justify-center items-center w-screen h-screen absolute top-0 left-0">
            <div className="show left-0 w-full"><h2 className="mb-4 text-slate-100 text-center text-xl">Loading Profile</h2><div className="loader loader_bubble m-auto"></div></div>
          </div>
        ) : (
          <div className="h-full w-full pt-10 show">
            <div className="w-11/12 my-0 mx-[auto]">
              <div
                className="rounded-full w-24 h-24 mx-auto bg-cover bg-center"
                style={{
                  backgroundImage: `url("` + backgroundProfile + `")`,
                }}
              ></div>
              <h2 className="mt-4 text-center text-zinc-100 font-semibold text-2xl">
                {friend.name}
              </h2>
              <p className="text-white focus:text-white text-[16px] lg:min-w-[450px] text-center mt-3 text-l">
                {friend.description}
              </p>
            </div>
            <p className="text-violet-800 focus:text-white text-[14px] lg:min-w-[450px] text-center mt-6 text-xl">{friend.name}'s tickets</p>
            <FriendTickets id_user={friend.id} />
          </div>
        )}
      </div>
    </div>
  );
}
