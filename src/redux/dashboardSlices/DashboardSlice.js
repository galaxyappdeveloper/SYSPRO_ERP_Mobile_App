import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DashboardPermissionData: [],
  loading: false,
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardPermissionData: (state, { payload }) => {
      state.DashboardPermissionData = payload;
    },
    setDashboardLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const { setDashboardPermissionData, setDashboardLoading } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
