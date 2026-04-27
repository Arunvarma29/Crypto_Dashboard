import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PortfolioCard() {
  const portfolio = [
    { name: "Tether", value: 375 },
    { name: "Luna", value: 375 },
    { name: "Ethereum", value: 250 },
  ];

  const total = portfolio.reduce((sum, c) => sum + c.value, 0);

  const data = {
    // labels: portfolio.map((c) => c.name),
    datasets: [
      {
        data: portfolio.map((c) => c.value),
        backgroundColor: ["#3b82f6", "#f87171", "#34d399"],
        borderWidth: 0,
      },
    ],
  };

  //   const options = {
  //   plugins: {
  //     legend: {
  //       position: "bottom", 
  //       labels: {
  //         color: "#475569",
  //         usePointStyle: true,
  //         pointStyle: "circle",
  //         padding: 15,
  //       },
  //     },
  //   },
  // };

  const options = {
  plugins: {
    legend: {
      display: false,
    },

    datalabels: {
      color: "#fff",
      font: {
        weight: "bold",
        size: 14,
      },
      formatter: (value) => `$${value}`, 
    },
  },
};

  return (
    <div className="bg-white p-3 sm:p-5 md:p-8 lg:p-10 rounded-xl border border-slate-200">
      <div className="flex flex-col sm:flex-row justify-between mb-3 sm:mb-4 md:mb-6 gap-2 sm:gap-0">
        <h3 className="text-lg sm:text-xl md:text-2xl font-mono font-bold">Portfolio</h3>
        <span className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl font-mono font-bold">
          Total value ${total}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-15">
        <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-55 md:h-55 p-2 sm:p-3">
          <Pie data={data} options={options} />
        </div>

        <div className="space-y-2 md:pl-8 lg:pl-12">
          {portfolio.map((coin, i) => (
            <div key={coin.name} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ background: data.datasets[0].backgroundColor[i] }}
              />
              <span className="text-xs sm:text-sm md:text-base text-slate-600">{coin.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
