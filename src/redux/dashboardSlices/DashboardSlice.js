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
  },
});
