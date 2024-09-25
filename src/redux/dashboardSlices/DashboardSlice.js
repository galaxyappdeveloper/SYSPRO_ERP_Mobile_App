import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DashboardPermissionData: [],
  DashboardSaleTotal: [],
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setDashboardPermissionData: (state, { payload }) => {
      state.DashboardPermissionData = payload;
    },
    setDashboardSaleTotal: (state, { payload }) => {
      state.DashboardSaleTotal = payload;
    },
  },
});

export const {
  setDashboardPermissionData,
  setDashboardLoading,
  setDashboardSaleTotal,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
