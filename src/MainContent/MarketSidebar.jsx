import { useSelector } from "react-redux";
import CoinRow from "../components/CoinRow.jsx";
import { useState, useEffect } from "react";

export default function MarketSidebar() {
  const { coins = [], loading, error } = useSelector(
    (state) => state.market
  );

  const [prevMarket, setPrevMarket] = useState([]);

  
  useEffect(() => {
    if (coins.length > 0) {
      setPrevMarket(coins);
    }
  }, [coins]);

  // IMPORTANT: Fallback to previous data when API returns empty (prevents UI flicker / blank state during rate limit or refetch)
  const safeCoins = coins.length ? coins : prevMarket;
  const displayCoins = safeCoins.slice(0, 10);

  return (
    <aside className="w-full max-w-90 bg-white rounded-xl border border-slate-200 p-2 sm:p-3 md:p-5">

      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-3 sm:mb-4 md:mb-5 leading-snug">
        Cryptocurrency by <br /> market cap
      </h2>

      
      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      
      {displayCoins.length > 0 ? (
        displayCoins.map((coin, index) => (
          <CoinRow
            key={coin.id}
            coin={{
              name: coin.name,
              cap: coin.market_cap,
              change: coin.price_change_percentage_24h,
              up: coin.price_change_percentage_24h >= 0,
            }}
            isLast={index === displayCoins.length - 1}
          />
        ))
      ) : (
        <p className="text-sm text-slate-400">No data available</p>
      )}

      
      {loading && (
        <p className="text-xs text-slate-400 mt-3">
          Updating market data...
        </p>
      )}
    </aside>
  );
}