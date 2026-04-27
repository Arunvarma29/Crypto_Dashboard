import { useState, useEffect } from "react";
import { fetchMarketData } from "../../services/cryptoApi.js"; 

const FIAT = ["usd", "inr", "eur"];

export default function ExchangeCard() {
  const [coins, setCoins] = useState([]);
  const [prices, setPrices] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sell, setSell] = useState("bitcoin");
  const [buy, setBuy] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleExchange = () => {
    if (!amount || error) {
      setMessage({ type: "error", text: "Please enter a valid amount" });
      return;
    }

    if (sell === buy) {
      setMessage({ type: "error", text: "Choose different coins" });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      setMessage({
        type: "success",
        text: `Exchanged ${amount} ${sell.toUpperCase()} → ${buy.toUpperCase()}`,
      });

      setAmount("");
    }, 1000);
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  
  useEffect(() => {
    const load = async () => {
      const data = await fetchMarketData("usd");
      setCoins(data);

      const map = {};
      data.forEach((c) => {
        map[c.id] = c.current_price;
      });
      setPrices(map);
    };

    load();
  }, []);

  
  const handleInput = (val) => {
    if (!val) {
      setAmount("");
      setError("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(val)) {
      setError("Please enter a valid number");
      return;
    }

    setError("");
    setAmount(val);
  };


  const calculate = () => {
    if (!amount || error) return "";

    
    if (FIAT.includes(sell) && !FIAT.includes(buy)) {
      const price = prices[buy];
      if (!price) return "";
      return (amount / price).toFixed(4);
    }

    
    if (!FIAT.includes(sell) && FIAT.includes(buy)) {
      const price = prices[sell];
      if (!price) return "";
      return (amount * price).toFixed(2);
    }

    
    if (!FIAT.includes(sell) && !FIAT.includes(buy)) {
      const sellPrice = prices[sell];
      const buyPrice = prices[buy];
      if (!sellPrice || !buyPrice) return "";

      return ((amount * sellPrice) / buyPrice).toFixed(4);
    }

    return "";
  };

  const allOptions = [
    ...FIAT.map((f) => ({ id: f, name: f.toUpperCase() })),
    ...coins.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div className="">
      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center
    ${
      message.type === "error"
        ? "bg-red-100 text-red-600"
        : "bg-green-100 text-green-600"
    }`}
        >
          <span>{message.text}</span>

          {/* close button */}
          <button
            onClick={() => setMessage(null)}
            className="text-lg font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white p-3 sm:p-5 md:p-8 lg:p-10 rounded-xl border border-slate-200 w-full">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-mono mb-3 sm:mb-4 md:mb-5">
          Exchange Coins
        </h3>

       
        <div className="flex flex-col justify-center mt-2 sm:mt-3 ">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
            <span className="text-orange-500 text-base sm:text-lg md:text-xl h-5 font-medium m-1 sm:m-2">
              Sell
            </span>

            <div className="relative w-32 sm:w-35 md:w-40">
              <select
                value={sell}
                onChange={(e) => setSell(e.target.value)}
                className="bg-gray-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 pr-8 rounded-lg appearance-none w-full text-xs sm:text-sm"
              >
                {allOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

             
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </span>
            </div>

           
            <div className="flex space-y-2 sm:space-y-3 relative bottom-0 sm:bottom-3 md:bottom-5 flex-col">
              <label className="text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold text-slate-400">
                Enter value
              </label>

              <input
                type="text"
                placeholder="0.0"
                value={amount}
                onChange={(e) => handleInput(e.target.value)}
                className="border-gray-200 text-sm sm:text-base md:text-lg border-2 px-2 sm:px-3 py-1.5 sm:py-2 md:py-3 rounded-lg"
              />

              {error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
              )}
            </div>
          </div>

        
          <div className="flex items-center m-1 sm:m-2 mb-2 sm:mb-3 flex-wrap gap-2">
            <span className="text-green-500 text-base sm:text-lg md:text-xl h-5 font-medium">
              Buy
            </span>

            <div className="relative w-32 sm:w-35 md:w-40">
              <select
                value={buy}
                onChange={(e) => setBuy(e.target.value)}
                className="bg-gray-100 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 pr-8 rounded-lg appearance-none w-full text-xs mx-2 sm:text-sm"
              >
                {allOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </span>
            </div>
          
            <div className="text-green-600 text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-3 md:px-4 font-semibold">
              {amount && !error ? `${calculate()} ${buy.toUpperCase()}` : "—"}
            </div>
          </div>

          <button
            onClick={handleExchange}
            disabled={loading}
            className="w-32 sm:w-36 md:w-40 bg-blue-600 text-white text-xs sm:text-sm md:text-base mx-auto py-2 sm:py-2.5 md:py-3 rounded-xl hover:bg-blue-900 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Exchange"}
          </button>
        </div>
      </div>
    </div>
  );
}
