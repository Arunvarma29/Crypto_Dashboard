import React from "react";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Filler,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Filler,
//   Legend
// );

// export default function ChartCard({
//   data = [],
//   timeFilters,
//   activeFilter,
//   onFilterChange,
// }) {
//   return (
//     <div className="bg-white rounded-2xl border border-slate-200 px-4 sm:px-5 pt-5 pb-4">

//       <FilterRow
//         filters={timeFilters}
//         active={activeFilter}
//         onChange={onFilterChange}
//       />

//       <ChartLegend coin="Ethereum" />

//       <PriceChart data={data} />
//     </div>
//   );
// }

// //////////////////////////////////////////////////////////////////
// // ── Filter Row
// //////////////////////////////////////////////////////////////////

// function FilterRow({ filters, active, onChange }) {
//   return (
//     <div className="flex flex-wrap items-center gap-2 mb-4">

//       {/* Time filters */}
//       {filters.map((f) => (
//         <button
//           key={f}
//           onClick={() => onChange(f)}
//           className={`px-3 py-1 rounded-lg text-[13px] font-medium transition
//             ${
//               active === f
//                 ? "border-[1.5px] border-blue-500 bg-blue-50 text-blue-600"
//                 : "border border-slate-200 text-slate-500 hover:border-slate-300"
//             }`}
//         >
//           {f}
//         </button>
//       ))}

//       {/* Calendar */}
//       <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300">
//         📅
//       </button>

//       {/* Spacer */}
//       <div className="flex-1" />

//       <DropdownButton label="Cryptocurrency" />
//       <DropdownButton label="Chart Type" />
//     </div>
//   );
// }

// //////////////////////////////////////////////////////////////////
// // ── Chart Legend
// //////////////////////////////////////////////////////////////////

// function ChartLegend({ coin }) {
//   return (
//     <div className="flex justify-end items-center gap-2 mb-2 text-xs text-slate-500">
//       <div className="w-2 h-2 rounded-full bg-blue-400" />
//       {coin}
//     </div>
//   );
// }

// //////////////////////////////////////////////////////////////////
// // ── Chart.js Line Chart
// //////////////////////////////////////////////////////////////////

// function PriceChart({ data }) {
//   const chartData = {
//     labels: data?.map((d) => d.month) || [],
//     datasets: [
//       {
//         label: "Price",
//         data: data?.map((d) => d.price) || [],
//         borderColor: "#60a5fa",
//         backgroundColor: "rgba(96,165,250,0.15)",
//         tension: 0.4,
//         pointRadius: 0,
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,

//     plugins: {
//       legend: { display: false },

//       tooltip: {
//         backgroundColor: "#1e293b",
//         titleColor: "#94a3b8",
//         bodyColor: "#60a5fa",
//         displayColors: false,
//         callbacks: {
//           label: (ctx) =>
//             `$${(ctx.raw || 0).toLocaleString()}`,
//         },
//       },
//     },

//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: {
//           color: "#94a3b8",
//           font: { size: 12 },
//         },
//       },
//       y: {
//         grid: { color: "#f1f5f9" },
//         ticks: {
//           color: "#94a3b8",
//           callback: (v) =>
//             v >= 1000 ? `${v / 1000}K` : v,
//         },
//       },
//     },
//   };

//   return (
//     <div className="h-48 sm:h-56 md:h-64">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// }

// //////////////////////////////////////////////////////////////////
// // ── Dropdown Button
// //////////////////////////////////////////////////////////////////

// function DropdownButton({ label }) {
//   return (
//     <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-[13px] text-slate-700 hover:border-slate-300 transition">
//       {label}
//       <svg width="12" height="12" viewBox="0 0 12 12">
//         <path
//           d="M2 4l4 4 4-4"
//           stroke="#334155"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </button>
//   );
// }




const ChartCard = () => {
  return <div>ChartCard</div>;
};

export default ChartCard;
