import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 fetch single coin
export const fetchChartData = createAsyncThunk(
  "chart/fetchChartData",
  async ({ coin, currency, days }) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
    );
    const data = await res.json();

    return {
      coin,
      prices: data.prices.map((p) => ({
        time: p[0],
        price: p[1],
      })),
    };
  }
);

// 🔹 multi coin fetch
export const fetchMultipleCoins = createAsyncThunk(
  "chart/fetchMultipleCoins",
  async ({ coins, currency, days }) => {
    const results = await Promise.all(
      coins.map(async (coin) => {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
        );
        const data = await res.json();

        return {
          coin,
          prices: data.prices.map((p) => ({
            time: p[0],
            price: p[1],
          })),
        };
      })
    );

    return results;
  }
);

const chartSlice = createSlice({
  name: "chart",

  initialState: {
    selectedCoins: ["bitcoin"],
    timeframe: "7",
    chartType: "line",
    data: {},
    loading: false,
  },

  reducers: {
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },

    setChartType: (state, action) => {
      state.chartType = action.payload;
    },

    toggleCoin: (state, action) => {
      const coin = action.payload;

      if (state.selectedCoins.includes(coin)) {
        state.selectedCoins = state.selectedCoins.filter((c) => c !== coin);
      } else {
        state.selectedCoins.push(coin);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMultipleCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMultipleCoins.fulfilled, (state, action) => {
        state.loading = false;

        action.payload.forEach((coinData) => {
          state.data[coinData.coin] = coinData.prices;
        });
      });
  },
});

export const { setTimeframe, setChartType, toggleCoin } =
  chartSlice.actions;

export default chartSlice.reducer;