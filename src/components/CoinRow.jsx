import { useSelector } from "react-redux";

export default function CoinRow({ coin, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-1 sm:px-2 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
    >
      <CoinInfo name={coin.name} cap={coin.cap} />
      <ChangeLabel change={coin.change} up={coin.up} />
    </div>
  );
}

function CoinInfo({ name, cap }) {
  const currency = useSelector((state) => state.crypto.baseCurrency);

  const symbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
  };

  const symbol = symbols[currency] || "$";

  return (
    <div>
      <p className="text-xs sm:text-sm font-semibold text-slate-800">{name}</p>
      <p className="text-xs sm:text-xs text-slate-400">
        Mkt.Cap {symbol} {formatMarketCap(cap)}
      </p>
    </div>
  );
}


function ChangeLabel({ change = 0, up }) {
  return (
    <div
      className={`flex items-center gap-1 text-sm font-semibold ${
        up ? "text-emerald-500" : "text-red-500"
      }`}
    >
      <span className="text-xs">{up ? "▲" : "▼"}</span>
      {(change ?? 0).toFixed(2)}%
    </div>
  );
}


function formatMarketCap(num = 0) {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num;
}
