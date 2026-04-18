import React from "react";

// export default function ExchangeCard({
//   coinOptions = [],
//   sellCoin,
//   buyCoin,
//   onSellChange,
//   onBuyChange,
// }) {
//   const [inputValue, setInputValue] = useState("");

//   function handleExchange() {
//     alert(`Exchanging ${inputValue || "0"} ${sellCoin} → ${buyCoin}`);
//   }

//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 p-5">
//       <h3 className="text-base font-bold text-slate-800 mb-3.5">Exchange Coins</h3>

//       {/* "Enter value" hint — aligns above the right-side inputs */}
//       <p className="text-[11px] text-slate-400 text-right mb-1">Enter value</p>

//       {/* Sell row */}
//       <CoinRow
//         label="Sell"
//         labelClass="text-orange-500"
//         selectedCoin={sellCoin}
//         coinOptions={coinOptions}
//         onChange={onSellChange}
//       >
//         {/* Editable input on the right */}
//         <input
//           className="w-28 border border-slate-200 rounded-lg px-2.5 py-1.5
//                      text-[13px] text-slate-400 outline-none bg-white
//                      placeholder:text-slate-300"
//           placeholder="Avl : 0.002BTC"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//       </CoinRow>

//       {/* Buy row */}
//       <CoinRow
//         label="Buy"
//         labelClass="text-emerald-500"
//         selectedCoin={buyCoin}
//         coinOptions={coinOptions}
//         onChange={onBuyChange}
//       >
//         {/* Read-only display value on the right */}
//         <div className="w-28 border border-slate-200 rounded-lg px-2.5 py-1.5
//                         text-[13px] font-semibold text-emerald-500 bg-white">
//           23000 Eth
//         </div>
//       </CoinRow>

//       <ExchangeButton onClick={handleExchange} />
//     </div>
//   );
// }

// // ── A single Sell or Buy row ──────────────────
// // `children` is the right-side element (input or display value)
// function CoinRow({ label, labelClass, selectedCoin, coinOptions, onChange, children }) {
//   return (
//     <div className="flex items-center gap-2.5 mb-2.5">
//       {/* "Sell" / "Buy" label */}
//       <span className={`text-[13px] font-semibold w-7 shrink-0 ${labelClass}`}>
//         {label}
//       </span>

//       {/* Coin dropdown */}
//       <select
//         className="flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5
//                    text-[13px] font-medium text-slate-800 bg-white
//                    outline-none cursor-pointer"
//         value={selectedCoin}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {coinOptions.map((coin) => (
//           <option key={coin} value={coin}>{coin}</option>
//         ))}
//       </select>

//       {/* Right-side slot */}
//       {children}
//     </div>
//   );
// }

// // ── Exchange button ───────────────────────────
// function ExchangeButton({ onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="block w-3/5 mx-auto mt-4 bg-linear-to-br from-blue-500 to-blue-700
//                  text-white font-semibold text-sm py-2.5 rounded-xl border-none
//                  cursor-pointer shadow-[0_4px_14px_rgba(59,130,246,0.35)]
//                  hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,130,246,0.45)]
//                  transition-all duration-150"
//     >
//       Exchange
//     </button>
//   );
// }



const ExchangeCard = () => {
  return <div>ExchangeCard</div>;
};

export default ExchangeCard;
