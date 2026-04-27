import React from "react";

const navBar = () => {
  return (
    <>
      <div className="flex px-3 sm:px-6 md:px-10 lg:px-24 mx-auto shadow-xl place-content-between items-center min-h-16 sm:min-h-20">
        <span className="flex gap-0.5 p-2 sm:p-3 md:p-5">
          <span className="bg-red-600 text-white text-lg sm:text-2xl md:text-3xl font-bold px-1 sm:px-2 rounded-sm h-8 sm:h-9 md:h-10 self-center flex items-center justify-center">
            C
          </span>
          <span className="bg-green-400 text-white text-sm sm:text-xl md:text-2xl font-bold px-1 sm:px-2 rounded-sm h-8 sm:h-9 md:h-9 self-center flex items-center justify-center">
            rypto
          </span>
          <span className="bg-red-600 text-white text-xs sm:text-sm md:text-2xl font-bold px-1 sm:px-2 rounded-sm h-8 sm:h-9 md:h-9 self-center flex items-center justify-center">
            Dashboard
          </span>
        </span>

        <div className="flex gap-2 sm:gap-4 p-2 sm:p-3 md:p-5">
          <button className="border-2 bg-blue-950 text-white font-mono font-bold py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm md:text-base rounded-full hover:bg-blue-900 transition-colors" type="button">
            Watchlist
          </button>
        </div>
      </div>
    </>
  );
};

export default navBar;
