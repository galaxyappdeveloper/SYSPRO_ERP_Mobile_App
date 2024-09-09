import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlices/AuthSlice";
import configReducer from "../configSlice/configSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
  },
});

export default store;
