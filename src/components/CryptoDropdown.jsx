import { useState, useRef, useEffect } from "react";
import { fetchMarketData } from "../services/cryptoApi.js";

export default function CryptoDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [topCoins, setTopCoins] = useState([]);
  const ref = useRef();

  const mergedCoins = [
    ...topCoins,
    ...selected
      .filter((id) => !topCoins.find((c) => c.id === id))
      .map((id) => ({
        id,
        name: id.toUpperCase(),
      })),
  ];

  useEffect(() => {
    const loadCoins = async () => {
      try {
        const data = await fetchMarketData("usd"); 
        setTopCoins(data.slice(0, 10)); 
      } catch (err) {
        console.error("Top coins error:", err);
      }
    };

    loadCoins();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const toggleCoin = (coin) => {
    if (selected.includes(coin.id)) {
      onChange(selected.filter((c) => c !== coin.id));
    } else {
      onChange([...selected, coin.id]);
    }
  };

 
  const label =
    selected.length === 0
      ? "Cryptocurrency"
      : selected.length <= 2
        ? `Cryptocurrency (${selected.map((c) => c.toUpperCase()).join(", ")})`
        : `Cryptocurrency (${selected[0].toUpperCase()} +${selected.length - 1})`;
  return (
    <div className="relative" ref={ref}>
     
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border
                   border-slate-200 bg-white text-xs sm:text-sm text-slate-700
                   cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap"
      >
        <span className="truncate max-w-24 sm:max-w-35">{label} </span>
        <span className="text-xs shrink-0">▼</span>
      </button>

      
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 sm:w-52 bg-white border border-slate-200
                        rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
        >
          {mergedCoins.map((coin) => {
            const isActive = selected.includes(coin.id);

            return (
              <div
                key={coin.id}
                onClick={() => toggleCoin(coin)}
                className={`flex items-center justify-between px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm
                  cursor-pointer transition-colors
                  ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-slate-100"}
                `}
              >
                <span>{coin.name}</span>


                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center
                    ${isActive ? "bg-blue-500 border-blue-500" : "border-slate-300"}
                  `}
                >
                  {isActive && (
                    <span className="text-white text-[10px]">✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
