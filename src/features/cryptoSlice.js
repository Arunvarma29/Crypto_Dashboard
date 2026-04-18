import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Fetch coins by market cap
export const fetchCoins = createAsyncThunk(
  "crypto/fetchCoins",
  async ({ currency }) => {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1`
    );

    const data = await res.json();
    return data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    coins: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch coins";
      });
  },
});

export default cryptoSlice.reducer;