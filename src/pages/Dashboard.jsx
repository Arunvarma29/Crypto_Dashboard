import { useEffect, useMemo, useState } from "react";
import NavBar from "../components/Navbar.jsx";
import CurrencyDropdown from "../components/CurrencyDropdown.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "../store/slices/cryptoSlice.js";
import CoinSearch from "../components/CoinSearch.jsx";
import MarketSidebar from "../MainContent/MarketSidebar.jsx";
import { getMarketData } from "../store/slices/marketSlice.js";
import { formatChartData } from "../utils/formatChart.js";
import { getChartData } from "../store/slices/chartSlice.js";
import ChartCard from "../features/chart/ChartCard.jsx";
import PortfolioCard from "../features/portfolio/PortfolioCard.jsx";
import ExchangeCard from "../features/exchange/ExchangeCoins.jsx";



export default function Dashboard() {
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.crypto.baseCurrency);
  const { datasets = [], loading } = useSelector((state) => state.chart);

  const [activeFilter, setActiveFilter] = useState("1W");
  const [selectedCoins, setSelectedCoins] = useState(["bitcoin"]);
  const [chartType, setChartType] = useState("line");
  const [prevDatasets, setPrevDatasets] = useState([]);
  const [prevChart, setPrevChart] = useState([]);
  const [prevMarket, setPrevMarket] = useState([]);
  const { coins } = useSelector((state) => state.market);

  const handleSelect = (coin) => {
    setSelectedCoins((prev) => {
      if (prev.includes(coin.id)) return prev;
      return [...prev, coin.id];
    });
  };

  
  useEffect(() => {
    dispatch(getMarketData(currency));
  }, [currency, dispatch]);

  useEffect(() => {
    if (datasets.length > 0) {
      setPrevChart(datasets);
    }
  }, [datasets]);

  
  useEffect(() => {
    if (!selectedCoins.length) return;

    dispatch(
      getChartData({
        coinIds: selectedCoins,
        days: getDays(activeFilter),
        currency,
      }),
    );
  }, [selectedCoins, activeFilter, currency, dispatch]); 

  const safeDatasets = datasets.length ? datasets : prevDatasets;
  const safeChart = datasets.length ? datasets : prevChart;
  const safeMarket = coins.length ? coins : prevMarket;
  
  const chartData = useMemo(() => {
    return formatChartData(datasets, activeFilter);
  }, [safeDatasets, activeFilter]);

  useEffect(() => {
    if (coins.length > 0) {
      setPrevMarket(coins);
    }
  }, [coins]);
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="top-0 sticky z-50">
        <NavBar />
      </div>

      <div className="bg-blue-50 my-2 sm:my-3 md:my-4 mx-3 sm:mx-4 md:mx-6 lg:mx-24 min-h-screen rounded-sm">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] md:grid-cols-[1fr_300px] gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-2 sm:p-3 md:p-4 lg:p-6">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Top controls */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3">
              <CurrencyDropdown
                currency={currency}
                onChange={(value) => dispatch(setCurrency(value))}
              />
              <CoinSearch onSelect={handleSelect} />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 min-h-60 sm:min-h-72 md:min-h-80">
              {/* 🔥 Keep old data while loading to avoid crash */}
              {!chartData?.datasets?.length && loading ? (
                <p className="text-slate-400 text-xs sm:text-sm">Loading chart...</p>
              ) : (
                <ChartCard
                  data={formatChartData(safeChart, activeFilter)}
                  activeFilter={activeFilter}
                  onFilterChange={setActiveFilter}
                  selectedCoins={selectedCoins}
                  onCoinsChange={setSelectedCoins}
                  chartType={chartType}
                  onChartTypeChange={setChartType}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <PortfolioCard />
              <ExchangeCard />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full">
            <MarketSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

function getDays(filter) {
  switch (filter) {
    case "1D":
      return 1;
    case "1W":
      return 7;
    case "1M":
      return 30;
    case "6M":
      return 180;
    case "1Y":
      return 365;
    default:
      return 7;
  }
}
