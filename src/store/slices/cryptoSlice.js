import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCryptoData } from "../../services/cryptoApi.js";

export const getCryptoData = createAsyncThunk(
  "crypto/getData",
  async ({ coinIds, days, currency }) => {
    const data = await fetchCryptoData(coinIds, days, currency);
    return data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    data: [],
    loading: false,
    error: null,
    baseCurrency: "usd",
    currencies: ["usd", "inr", "eur"],
  },

  reducers: {
    setCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCryptoData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrency } = cryptoSlice.actions;
export default cryptoSlice.reducer;