const marketCache = {};

export async function fetchMarketData(currency = "usd") {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  try {
  
    if (marketCache[currency]) {
      console.log("CACHE HIT:", currency);
      return marketCache[currency];
    }

    await delay(300); 

    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );

    console.log("MARKET STATUS:", res.status);

   
    if (res.status === 429) {
      console.warn("Rate limited (market). Retrying...");
      await delay(1200);
      return fetchMarketData(currency);
    }

    if (!res.ok) throw new Error("Failed to fetch market data");

    const data = await res.json();

   
    marketCache[currency] = data;

    return data;
  } catch (err) {
    console.error("Market API error:", err);

   
    if (marketCache[currency]) {
      return marketCache[currency];
    }

    return [];
  }
}

export async function fetchCryptoData(coinIds, days, currency = "usd") {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const results = [];

  try {
    for (let id of coinIds) {
      console.log("FETCHING:", id);

      await delay(350); 

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
      );

      console.log("STATUS:", res.status);

      
      if (res.status === 429) {
        console.warn("Rate limited. Retrying...");
        await delay(1200);

        return fetchCryptoData(coinIds, days, currency); 
      }

      if (!res.ok) {
        console.error("API ERROR:", res.status);
        results.push({ id, prices: null }); 
        continue;
      }

      const data = await res.json();

      results.push({
        id,
        prices: data.prices || [],
      });
    }

    console.log("API FINAL:", results);

    return results;
  } catch (err) {
    console.error("Chart API error:", err);
    return [];
  }
}