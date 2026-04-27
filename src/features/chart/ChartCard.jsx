import TimeFilter from "../../components/TimeFilter";
import CryptoDropdown from "../../components/CryptoDropdown";
import PriceChart from "./PriceChart";
import { useSelector } from "react-redux";
import { getChartData } from "../../store/slices/chartSlice.js";
import { useDispatch } from "react-redux";
import ChartTypeDropdown from "../../components/ChartTypeDropdown.jsx";

export default function ChartCard({
  data,
  activeFilter,
  onFilterChange,
  selectedCoins,
  onCoinsChange,
  chartType,
  onChartTypeChange
}) {
  const currency = useSelector((state) => state.crypto.baseCurrency);
  const dispatch = useDispatch();

  const handleDateChange = (start, end) => {
    if (!start || !end) return;

    const diff = new Date(end) - new Date(start);
    if (diff <= 0) return;

    onFilterChange(null); 

    const days = diff / (1000 * 60 * 60 * 24);

    dispatch(
      getChartData({
        coinIds: selectedCoins,
        days: Math.ceil(days),
        currency,
      }),
    );
  };
  return (
    <div className="bg-white p-2 sm:p-3 md:p-4 lg:p-5 rounded-xl border border-slate-200">
     
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <TimeFilter
          active={activeFilter}
          onChange={onFilterChange}
          onDateChange={handleDateChange}
        />

        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <CryptoDropdown selected={selectedCoins} onChange={onCoinsChange} />

          <ChartTypeDropdown value={chartType} onChange={onChartTypeChange} />
        </div>
      </div>

     
      <PriceChart data={data} currency={currency}  chartType={chartType}/>
    </div>
  );
}
