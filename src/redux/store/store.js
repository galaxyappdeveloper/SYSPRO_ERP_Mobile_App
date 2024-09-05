import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../authSlices/AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default store;
