import { useState, useEffect } from "react";
import { searchCoins } from "../services/searchApi";

export default function CoinSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setCoins([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const results = await searchCoins(query); 
        setCoins(results);

      } catch (err) {
        console.error("Search error:", err);
        setCoins([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative flex-1 max-w-7xl">

      
      <div className="flex items-center gap-2 sm:gap-2.5 bg-white border border-slate-200 rounded-xl px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
        <SearchIcon />
        <input
          className="flex-1 min-w-0 border-none outline-none text-xs sm:text-sm md:text-base text-slate-500 bg-transparent placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm"
          placeholder="Search by coin"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

    
      {query && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">

          {loading ? (
            <div className="px-4 py-2 text-sm text-slate-400">
              Searching...
            </div>
          ) : coins.length > 0 ? (
            coins.map((coin) => (
              <div
                key={coin.id}
                onClick={() => {
                  onSelect?.(coin);
                  setQuery("");
                  setCoins([]);
                }}
                className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-slate-100 transition"
              >
                <span className="text-sm text-slate-700">
                  {coin.name}
                </span>
                <span className="text-xs text-slate-400">
                  {coin.symbol.toUpperCase()}
                </span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-slate-400">
              No results found
            </div>
          )}

        </div>
      )}
    </div>
  );
}



function SearchIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" stroke="#94a3b8" strokeWidth="2" />
      <path
        d="M16.5 16.5l4 4"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}