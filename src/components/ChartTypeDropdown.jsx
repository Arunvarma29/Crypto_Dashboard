import { useState, useRef, useEffect } from "react";

/**
 * ChartTypeDropdown Component
 * Allows users to switch between line chart and bar chart
 * Props:
 * - value: Currently selected chart type ('line' or 'bar')
 * - onChange: Callback when chart type is changed
 */
export default function ChartTypeDropdown({ value, onChange }) {
  // State for dropdown visibility
  const [open, setOpen] = useState(false);
  // Ref to detect outside clicks
  const ref = useRef();

  // Available chart type options
  const options = [
    { label: "Line Chart", value: "line" },
    { label: "Bar Chart", value: "bar" },
  ];

  // Effect: Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    // Cleanup event listener on unmount
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Generate display label based on selected chart type
  const selectedLabel =
  value
    ? `Chart Type (${options.find((opt) => opt.value === value)?.label})`
    : "Chart Type";
  
  return (
    <div className="relative" ref={ref}>
      {/* Dropdown toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border
                   border-slate-200 bg-white text-xs sm:text-sm text-slate-700
                   cursor-pointer hover:border-slate-300 transition-colors whitespace-nowrap"
      >
        <span className="truncate max-w-24 sm:max-w-40">{selectedLabel}</span>
        <span className="text-xs shrink-0">▼</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white border border-slate-200
                        rounded-lg shadow-lg z-20">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                // Update selected chart type
                onChange(opt.value);
                // Close dropdown after selection
                setOpen(false);
              }}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-slate-100 transition-colors
                ${value === opt.value ? "bg-blue-50 text-blue-600" : ""}
              `}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}