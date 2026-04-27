import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./slices/cryptoSlice.js";
import marketReducer from "./slices/marketSlice.js";
import chartReducer from "./slices/chartSlice.js";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    market: marketReducer,
    chart: chartReducer,
  },
});

