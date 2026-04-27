import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components for pie chart
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

/**
 * PortfolioCard Component
 * Displays user's cryptocurrency portfolio as a pie chart
 * Shows holdings and total portfolio value
 * Features:
 * - Pie chart visualization with data labels
 * - Responsive design
 * - Legend showing coin allocations
 */
export default function PortfolioCard() {
  // Sample portfolio data
  const portfolio = [
    { name: "Tether", value: 375 },
    { name: "Luna", value: 375 },
    { name: "Ethereum", value: 250 },
  ];

  // Calculate total portfolio value
  const total = portfolio.reduce((sum, c) => sum + c.value, 0);

  // Prepare data for pie chart
  const data = {
    // labels: portfolio.map((c) => c.name),
    datasets: [
      {
        // Extract values from portfolio
        data: portfolio.map((c) => c.value),
        // Color scheme for each slice
        backgroundColor: ["#3b82f6", "#f87171", "#34d399"],
        // No border on pie slices
        borderWidth: 0,
      },
    ],
  };

  // Chart.js configuration options
  const options = {
    plugins: {
      // Hide legend (using custom legend instead)
      legend: {
        display: false,
      },
      // Configure data labels (values shown on pie slices)
      datalabels: {
        // White text color
        color: "#fff",
        // Bold font style
        font: {
          weight: "bold",
          size: 14,
        },
        // Format labels as currency
        formatter: (value) => `$${value}`, 
      },
    },
  };

  return (
    <div className="bg-white p-3 sm:p-5 md:p-8 lg:p-10 rounded-xl border border-slate-200">
      {/* Portfolio header with total value */}
      <div className="flex flex-col sm:flex-row justify-between mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-0">
        <h3 className="text-lg sm:text-xl md:text-2xl font-mono font-bold">Portfolio</h3>
        <span className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold">
          Total value ${total}
        </span>
      </div>

      {/* Pie chart and legend */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-15">
        {/* Pie chart container */}
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-55 md:h-55 p-2 sm:p-3">
          <Pie data={data} options={options} />
        </div>

        {/* Custom legend showing portfolio items */}
        <div className="space-y-2 md:pl-8 lg:pl-12">
          {portfolio.map((coin, i) => (
            <div key={coin.name} className="flex items-center gap-2">
              {/* Colored circle indicator */}
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: data.datasets[0].backgroundColor[i] }}
              />
              {/* Coin name */}
              <span className="text-xs sm:text-sm md:text-base text-slate-600">{coin.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
