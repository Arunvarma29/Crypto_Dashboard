import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchMarketData }  from "../../services/cryptoApi.js";

export const getMarketData = createAsyncThunk(
  "market/getData",
  async (currency) => {
    return await fetchMarketData(currency);
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    coins: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarketData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMarketData.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(getMarketData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default marketSlice.reducer;