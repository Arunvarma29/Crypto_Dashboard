import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import TimeFilter from "../../components/TimeFilter.jsx";
import { Line, Bar } from "react-chartjs-2";
import { BarElement } from "chart.js";

// Register Chart.js components for line and bar charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement,
);

/**
 * PriceChart Component
 * Displays cryptocurrency price trends as line or bar chart
 * Props:
 * - data: Chart data formatted for Chart.js (labels and datasets)
 * - currency: Selected currency for display (USD, EUR, INR)
 * - chartType: Chart type to display ('line' or 'bar')
 * - activeFilter, onFilterChange: Time filter state and callback
 */
export default function PriceChart({
  data,
  activeFilter,
  onFilterChange,
  currency,
  chartType,
}) {
  // Show loading state if no data is available
  if (!data || !data.datasets || data.datasets.length === 0) {
    return (
      <div className="h-40 sm:h-52 md:h-64 flex items-center justify-center text-slate-400 text-xs sm:text-sm">
        Loading chart...
      </div>
    );
  }

  const currencySymbols = {
    usd: "$",
    inr: "₹",
    eur: "€",
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    hover: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#475569",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },

        datalabels: {
    display: false, 
  },


      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1e293b",
        callbacks: {
          label: (ctx) => {
            const symbol = currencySymbols[currency] || currency.toUpperCase();
            return `${ctx.dataset.label}: ${symbol}${ctx.raw.toLocaleString()}`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 6,
        },
      },

      y: {
        beginAtZero: false,
        ticks: {
          color: "#94a3b8",
          callback: (value) => {
            const symbol = currencySymbols[currency] || currency.toUpperCase();

            if (value >= 1e9) return `${symbol}${(value / 1e9).toFixed(1)}B`;
            if (value >= 1e6) return `${symbol}${(value / 1e6).toFixed(1)}M`;
            if (value >= 1e3) return `${symbol}${(value / 1e3).toFixed(1)}K`;
            return `${symbol}${value}`;
          },
        },
        grid: {
          color: "#f1f5f9",
        },
      },
    },
  };
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200">
     
      <div className="h-64">
        {chartType === "bar" ? (
          <Bar data={data} options={options} />
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  );
}
