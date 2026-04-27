import { useSelector } from "react-redux";

/**
 * CoinRow Component
 * Displays a single cryptocurrency row with market info and price change
 * Props:
 * - coin: Object containing coin data (name, market_cap, price_change_percentage_24h)
 * - isLast: Boolean indicating if this is the last row (to hide bottom border)
 */
export default function CoinRow({ coin, isLast }) {
  return (
    <div
      className={`flex items-center justify-between py-2 sm:py-2.5 md:py-3 px-1 sm:px-2 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
    >
      {/* Coin name and market cap on left side */}
      <CoinInfo name={coin.name} cap={coin.cap} />
      {/* Price change percentage on right side */}
      <ChangeLabel change={coin.change} up={coin.up} />
    </div>
  );
}

/**
 * CoinInfo Component
 * Displays coin name and formatted market cap
 */
function CoinInfo({ name, cap }) {
  // Get selected currency from Redux store
  const currency = useSelector((state) => state.crypto.baseCurrency);

  // Currency symbol mapping
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


/**
 * ChangeLabel Component
 * Displays the 24-hour price change percentage with up/down indicator
 * Color: Green for positive change, Red for negative change
 */
function ChangeLabel({ change = 0, up }) {
  return (
    <div
      className={`flex items-center gap-1 text-sm font-semibold ${
        up ? "text-emerald-500" : "text-red-500"
      }`}
    >
      {/* Up arrow for positive change, down arrow for negative */}
      <span className="text-xs">{up ? "▲" : "▼"}</span>
      {/* Display percentage change with 2 decimal places */}
      {(change ?? 0).toFixed(2)}%
    </div>
  );
}


/**
 * Format Market Cap Function
 * Converts large numbers to abbreviated format (T, B, M)
 * Examples: 1,234,567,890,000 → 1.23T
 */
function formatMarketCap(num = 0) {
  // Trillions
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  // Billions
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  // Millions
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  // Return as-is for smaller numbers
  return num;
}
