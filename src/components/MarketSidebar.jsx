import React from "react";
import { useSelector } from "react-redux";

export default function MarketSidebar() {
  const { coins, loading, error } = useSelector((state) => state.crypto);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 p-5">
      <h2 className="text-[15px] font-bold text-slate-800 leading-snug mb-5">
        Cryptocurrency by
        <br />
        market cap
      </h2>

      {coins.map((coin, index) => (
        <CoinRow
          key={coin.id}
          coin={{
            name: coin.name,
            cap: coin.market_cap,
            change: coin.price_change_percentage_24h,
            up: coin.price_change_percentage_24h >= 0,
          }}
          isLast={index === coins.length - 1}
        />
      ))}
    </aside>
  );
}

// ── Single coin row ───────────────────────────
function CoinRow({ coin, isLast }) {
  return (
    <div
      className={`flex items-center py-3 ${isLast ? "" : "border-b border-slate-100"}`}
    >
      <CoinInfo name={coin.name} cap={coin.cap} />
      <ChangeLabel change={coin.change} up={coin.up} />
    </div>
  );
}

// ── Left: name + market cap ───────────────────
function CoinInfo({ name, cap }) {
  const currency = useSelector((state) => state.currency.baseCurrency);
  const currencySymbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
  };
  return (
    <div className="flex-1">
      <p className="text-[14px] font-semibold text-slate-800 mb-0.5">{name}</p>
      <p className="text-[12px] text-slate-400">
        {" "}
        Mkt.Cap {currencySymbols[currency] || currency.toUpperCase()}{" "}
        {formatMarketCap(cap)}{" "}
      </p>
    </div>
  );
}

// ── Right: % change with arrow ────────────────
function ChangeLabel({ change, up }) {
  return (
    <div
      className={`flex items-center gap-1 text-[13px] font-semibold
                     ${up ? "text-emerald-500" : "text-amber-500"}`}
    >
      <span className="text-[10px]">{up ? "▲" : "▼"}</span>
      {change.toFixed(2)} %
    </div>
  );
}

function formatMarketCap(num) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num;
}
