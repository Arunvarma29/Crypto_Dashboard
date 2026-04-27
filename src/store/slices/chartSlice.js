import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoData } from "../../services/cryptoApi.js";

export const getChartData = createAsyncThunk(
  "chart/getData",
  async ({ coinIds, days, currency }) => {
    console.log("THUNK CALLED:", coinIds, days, currency);
    return await fetchCryptoData(coinIds, days, currency);
  },
);

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    datasets: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChartData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.datasets = action.payload;
      })
      .addCase(getChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default chartSlice.reducer;
