import React from "react";
import { useSelector } from "react-redux";

/**
 * CurrencyDropdown Component
 * Allows users to select different currency types (USD, INR, EUR, etc.)
 * Props:
 * - currency: Currently selected currency code (string)
 * - onChange: Callback function triggered when currency is changed
 * State from Redux:
 * - currencies: Array of available currency options
 * - loading: Loading state indicator
 */
const CurrencyDropdown = ({ currency, onChange }) => {
  // Fetch available currencies and loading state from Redux store
  const { currencies = [], loading } = useSelector((state) => state.crypto);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative w-auto min-w-24">

      <select
        value={currency}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full appearance-none flex items-center gap-1.5 bg-white border border-slate-200
                   rounded-xl px-2 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 pr-8 font-semibold text-xs sm:text-sm md:text-base text-slate-800
                   cursor-pointer hover:border-slate-300 transition-colors"
      >
        {/* Map through available currencies and display as options */}
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr.toUpperCase()}
          </option>
        ))}
      </select>

     
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600  text-xs">
        {/* Custom dropdown arrow indicator */}
        ▼
      </div>

    </div>
  );
};

export default CurrencyDropdown;