import React, { useState } from "react";

export default function TimeFilter({ active, onChange, onDateChange }) {
  const filters = ["1D", "1W", "1M", "6M", "1Y"];

  const [showCalendar, setShowCalendar] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="flex gap-1 sm:gap-2 items-center relative flex-wrap">

      
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => {
            onChange(f);
            setShowCalendar(false); 
          }}
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors
            ${
              active === f
                ? "bg-blue-100 text-blue-600 border border-blue-400"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {f}
        </button>
      ))}

      <button
        onClick={() => setShowCalendar((prev) => !prev)}
        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg transition-colors"
      >
        📅
      </button>

    
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 bg-white border rounded-lg shadow p-2 sm:p-3 z-20 w-64 sm:w-72">
          
          <div className="flex flex-col gap-2 text-xs sm:text-sm">
            <label>
              Start:
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="border ml-2 px-2 py-1 rounded"
              />
            </label>

            <label>
              End:
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="border ml-2 px-2 py-1 rounded"
              />
            </label>

            <button
              onClick={() => {
                if (start && end) {
                  onDateChange?.(start, end);
                  setShowCalendar(false);
                }
              }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>

        </div>
      )}
    </div>
  );
}