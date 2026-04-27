import React from "react";
import { useSelector } from "react-redux";

const CurrencyDropdown = ({ currency, onChange }) => {
  const { currencies = [], loading } = useSelector((state) => state.crypto);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative px-1">

      <select
        value={currency}
        onChange={(e) => onChange?.(e.target.value)}
        className="appearance-none flex items-center gap-1.5 bg-white border border-slate-200
                   rounded-xl px-2 sm:px-4 md:px-5 py-2 sm:py-3 md:py-4 pr-8 font-semibold text-xs sm:text-sm md:text-base text-slate-800
                   cursor-pointer hover:border-slate-300 transition-colors"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr.toUpperCase()}
          </option>
        ))}
      </select>

     
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs">
        ▼
      </div>

    </div>
  );
};

export default CurrencyDropdown;