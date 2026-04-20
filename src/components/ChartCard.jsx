import React from "react";

const ChartCard = () => {
  return(
    <div className="flex items-center gap-3 mb-4">

  {/* LEFT */}
  <div className="flex gap-2">

    {/* Time filters */}
    {["1D","1W","1M","6M","1Y"].map((t) => (
      <button className="px-3 py-1.5 rounded-md border text-sm">
        {t}
      </button>
    ))}

    {/* Calendar button */}
    <button className="px-2 py-1 border rounded-md">📅</button>

  </div>

  {/* PUSH RIGHT */}
  <div className="flex-1" />

  {/* RIGHT */}
  <div className="flex gap-3">

    {/* Crypto dropdown */}
    <CryptoDropdown />

    {/* Chart type dropdown */}
    <ChartTypeDropdown />

  </div>

</div>
  );
};

export default ChartCard;
