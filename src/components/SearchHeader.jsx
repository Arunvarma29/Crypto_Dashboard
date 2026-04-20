import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../features/currencySlice.js";

export default function SearchHeader({ onSearch }) {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.baseCurrency);

  return (
    <div className="flex items-center gap-4">
      <CurrencyDropdown
        currency={currency}
        onChange={(value) => dispatch(setCurrency(value))}
      />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

// ── Currency dropdown ────────────────────────
function CurrencyDropdown({ currency,onChange }) {
  const { currencies, loading } = useSelector((state) => state.currency);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="px-1">
      <select
        className="flex items-center gap-1.5 bg-white border border-slate-200
                       rounded-xl px-3.5 py-2.5 font-semibold text-sm text-slate-800
                       cursor-pointer hover:border-slate-300 transition-colors"
        value={currency}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── Search bar ────────────────────────────────
function SearchBar({ onSearch }) {
  return (
    <div
      className="flex-1 flex items-center gap-2.5 bg-white border border-slate-200
                    rounded-xl px-4 py-2.5"
    >
      <SearchIcon />
      <input
        className="flex-1 border-none outline-none text-sm text-slate-500
                   bg-transparent placeholder:text-slate-400"
        placeholder="Search by coin"
        onChange={(e) => onSearch?.(e.target.value)}
      />
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
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
