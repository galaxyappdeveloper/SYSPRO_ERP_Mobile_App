import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlices/AuthSlice";
import configReducer from "../configSlice/configSlice";
import dashboardReducer from "../dashboardSlices/DashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    config: configReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
