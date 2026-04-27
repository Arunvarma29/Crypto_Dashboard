import TimeFilter from "../../components/TimeFilter";
import CryptoDropdown from "../../components/CryptoDropdown";
import PriceChart from "./PriceChart";
import { useSelector } from "react-redux";
import { getChartData } from "../../store/slices/chartSlice.js";
import { useDispatch } from "react-redux";
import ChartTypeDropdown from "../../components/ChartTypeDropdown.jsx";

/**
 * ChartCard Component
 * Main container for price chart with controls (time filter, coin selector, chart type)
 * Props:
 * - data: Chart data formatted for Chart.js
 * - activeFilter: Currently active time filter (1D, 1W, etc.)
 * - onFilterChange: Callback when time filter changes
 * - selectedCoins: Array of selected coin IDs
 * - onCoinsChange: Callback when selected coins change
 * - chartType: Current chart type ('line' or 'bar')
 * - onChartTypeChange: Callback when chart type changes
 */
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

  /**
   * Handle custom date range selection
   * Calculates the difference in days and fetches chart data for that period
   */
  const handleDateChange = (start, end) => {
    // Validate dates
    if (!start || !end) return;

    // Calculate difference in milliseconds
    const diff = new Date(end) - new Date(start);
    // Ensure end date is after start date
    if (diff <= 0) return;

    // Clear active filter when custom date is selected
    onFilterChange(null); 

    // Convert milliseconds to days
    const days = diff / (1000 * 60 * 60 * 24);

    // Fetch chart data for calculated period
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
      {/* Chart controls section */}
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

      {/* Main chart display */}
      <PriceChart data={data} currency={currency}  chartType={chartType}/>
    </div>
  );
}
