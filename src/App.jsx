import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./App.css";
import NavBar from "./components/Navbar.jsx";
import SearchHeader from "./components/SearchHeader.jsx";
import ChartCard from "./components/ChartCard.jsx";        
import PortfolioCard from "./components/PortfolioCard.jsx";
import ExchangeCard from "./components/ExchangeCard.jsx";
import MarketSidebar from "./components/MarketSidebar.jsx";

import { fetchCurrencies } from "./features/currencySlice.js";
import { fetchCoins } from "./features/cryptoSlice.js";


function App() {

  const dispatch = useDispatch();
    const currency = useSelector((state) => state.currency.baseCurrency);

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

//  useEffect(() => {
//     dispatch(fetchCoins({ currency }));
//   }, [currency, dispatch]);  

  useEffect(() => {
     let isMounted = true;
    const fetchData = () => {
    if (isMounted) {
      dispatch(fetchCoins({ currency }));
    }
  };

  fetchData();
      const interval = setInterval(fetchData, 60000);

    // Cleanup
    return () => 
      isMounted = false;
      clearInterval(interval);
  }, [currency]);

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col">
        <div className="top-0 sticky ">
          <NavBar />
        </div>

        <div className="bg-blue-50 my-3 mx-5 lg:mx-24 lg:my-5 min-h-screen">
          {/* <div className="flex-1 grid  lg:grid-cols-[1fr_280px] gap-6 p-4 md:p-6 lg:p-7 items-start"> */}
          <div className="flex-1 grid  lg:grid-cols-12 gap-4 p-4 md:p-6 lg:p-7 items-start">
            <div className="flex-1 flex flex-col
                lg:grid lg:col-span-9
                gap-4 md:gap-6 p-4 md:p-6 lg:p-7
                items-start "

            >
              {/* <div className="flex border-2 border-black flex-col gap-5">
                dffj
              </div> */}

              <div className="flex flex-col lg:flex-col gap-5">
                <SearchHeader />

                <ChartCard />

                <div className="grid lg:grid-cols-2 gap-5">
                  <PortfolioCard />

                  <ExchangeCard />
                </div>
              </div>
            </div>
            <MarketSidebar className="lg:col-span-3" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
