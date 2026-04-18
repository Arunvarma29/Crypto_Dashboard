import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  baseCurrency: "usd",
};

const allowedCurrencies = ["usd", "inr", "eur"];

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
    );

    const data = await res.json();

    // 🔥 Filter only required currencies
    return data.filter((c) => allowedCurrencies.includes(c));
  }
);


const currencySlice = createSlice({
  name: "currency",
  initialState: {
    baseCurrency: "usd",
    currencies: [],
    loading: false,
    error: null,
  },

  reducers: {
    setCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch currencies";
      });
  },
});


export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;