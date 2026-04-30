import { useState, useRef, useEffect } from "react";
import { fetchMarketData } from "../services/cryptoApi.js";

/**
 * CryptoDropdown Component
 * Multi-select dropdown for choosing cryptocurrencies to display on chart
 * Features:
 * - Fetches top 10 coins from API
 * - Allows selection/deselection of multiple coins
 * - Shows selected coins count in button
 * - Closes dropdown when clicking outside
 * Props:
 * - selected: Array of selected coin IDs
 * - onChange: Callback when selection changes
 */
export default function CryptoDropdown({ selected, onChange }) {
  // State for dropdown visibility
  const [open, setOpen] = useState(false);
  // State for top coins fetched from API
  const [topCoins, setTopCoins] = useState([]);
  // Ref to detect outside clicks
  const ref = useRef();

  // Merge top coins with any selected coins not in top 10
  const mergedCoins = [
    ...topCoins,
    ...selected
      .filter((id) => !topCoins.find((c) => c.id === id))
      .map((id) => ({
        id,
        name: id.toUpperCase(),
      })),
  ];

  // Effect: Load top 10 coins on component mount
  useEffect(() => {
    const loadCoins = async () => {
      try {
        // Fetch market data for USD currency
        const data = await fetchMarketData("usd"); 
        // Keep only top 10 coins
        setTopCoins(data.slice(0, 10)); 
      } catch (err) {
        console.error("Top coins error:", err);
      }
    };

    loadCoins();
  }, []);

  // Effect: Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    // Cleanup event listener on unmount
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /**
   * Toggle coin selection
   * If coin is selected, remove it; otherwise add it
   */
  const toggleCoin = (coin) => {
    if (selected.includes(coin.id)) {
      // Remove coin from selection
      onChange(selected.filter((c) => c !== coin.id));
    } else {
      // Add coin to selection
      onChange([...selected, coin.id]);
    }
  };

  // Generate display label based on selected coins count
  const label =
    selected.length === 0
      ? "Cryptocurrency"
      : selected.length <= 2
        ? `Cryptocurrency (${selected.map((c) => c.toUpperCase()).join(", ")})`
        : `Cryptocurrency (${selected[0].toUpperCase()} +${selected.length - 1})`;
  
  return (
    <div className="relative" ref={ref}>
      {/* Dropdown toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border
                   border-slate-200 bg-white text-xs sm:text-sm text-slate-700
                   cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap"
      >
        <span className="truncate max-w-24 sm:max-w-35">{label} </span>
        <span className="text-xs shrink-0">▼</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute left-0 mt-2 w-48 sm:w-52 bg-white border border-slate-200
                        rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto"
        >
          {mergedCoins.map((coin) => {
            // Check if coin is currently selected
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
                {/* Custom checkbox indicator */}
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center
                    ${isActive ? "bg-blue-500 border-blue-500" : "border-slate-300"}
                  `}
                >
                  {/* Show checkmark when coin is selected */}
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
