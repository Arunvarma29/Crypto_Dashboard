import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./features/currencySlice.js";
import cryptoReducer from "./features/cryptoSlice.js";
// import chartReducer from "./features/chartSlice.js";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    crypto: cryptoReducer,
    // chart: chartReducer,
  },
});