import React from "react";
import logo from "../assets/crypto1.png";

const navBar = () => {
  return (
    <>
      <div className=" flex px-10 lg:px-24 mx-auto shadow-xl place-content-between ">
        <img
          src={logo}
          alt="logo"
          className="relative"
          width={80}
          height={80}
        />


        <div className=" flex gap-4 p-5 ">
          <button className=" border-2 bg-blue-950 text-white font-mono font-bold py-3 px-4 rounded-4xl " type="button">Watchlist</button> 
        </div>
      </div>
    </>
  );
};

export default navBar;
