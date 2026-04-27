
const cache = {};
export async function searchCoins(query) {
  try {
    if (!query) return [];

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    if (!res.ok) throw new Error("Search API failed");

    const data = await res.json();

     cache[query] = data.coins.slice(0, 10);

    return data.coins.slice(0, 10); 
  } catch (err) {
    console.error("Search API error:", err);
    return [];
  }
}