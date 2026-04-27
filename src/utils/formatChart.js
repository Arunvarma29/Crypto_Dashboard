export function formatChartData(apiData, filter) {
  if (!Array.isArray(apiData) || apiData.length === 0) {
    return { labels: [], datasets: [] };
  }

  
  const validCoins = apiData.filter(
    (coin) => Array.isArray(coin?.prices) && coin.prices.length > 0
  );

  if (validCoins.length === 0) {
    return { labels: [], datasets: [] };
  }

  
  const basePrices = validCoins[0].prices;

  const formatLabel = (timestamp) => {
    const date = new Date(timestamp);

    switch (filter) {
      case "1D":
        return `${date.getHours()}:00`;
      case "1W":
        return date.toLocaleDateString("en-US", { weekday: "short" });
      case "1M":
        return `W${Math.ceil(date.getDate() / 7)}`;
      case "6M":
      case "1Y":
        return date.toLocaleDateString("en-US", { month: "short" });
      default:
        return date.toLocaleDateString();
    }
  };

  const step = Math.max(1, Math.ceil(basePrices.length / 6));

  const filteredBase = basePrices.filter((_, i) => i % step === 0);
  const labels = filteredBase.map(([t]) => formatLabel(t));

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  
  const datasets = validCoins
    .map((coin, i) => {
      const filtered = coin.prices.filter((_, idx) => idx % step === 0);

      
      if (filtered.length === 0) return null;

      const aligned = filtered.slice(0, labels.length);

      if (aligned.length !== labels.length) return null;

      return {
        label: coin.id?.toUpperCase() || "UNKNOWN",
        data: aligned.map((p) => p[1]),

        borderColor: colors[i % colors.length],
        backgroundColor: colors[i % colors.length] + "70",

        tension: 0.4,
        pointRadius: 0,
        fill: false,

        borderWidth: 2,
        borderRadius: 6,
      };
    })
    .filter(Boolean); 

  return { labels, datasets };
}