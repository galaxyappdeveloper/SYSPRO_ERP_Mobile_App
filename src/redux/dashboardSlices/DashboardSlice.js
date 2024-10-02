import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DashboardPermissionData: [],
  dashboardTotal: [],
  dashboardSummary: [],
  dashboardSummaryDetail: [],
  dashboardReportPrint: "",
  reportType: "",
  stateFromDate: "",
  stateToDate: "",
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

    setDashboardTotal: (state, { payload }) => {
      if (state.dashboardTotal.length > 0) {
        state.dashboardTotal = [...state.dashboardTotal, ...payload];
      } else {
        state.dashboardTotal = payload;
      }
    },
    setDashboardSummary: (state, { payload }) => {
      state.dashboardSummary = payload;
    },
    setDashboardSummaryDetail: (state, { payload }) => {
      state.dashboardSummaryDetail = payload;
    },
    setDashboardReportPrint: (state, { payload }) => {
      state.dashboardReportPrint = payload;
    },
    setReportType: (state, { payload }) => {
      state.reportType = payload;
    },
    setStateFromDate: (state, { payload }) => {
      state.stateFromDate = payload;
    },
    setStateToDate: (state, { payload }) => {
      state.stateToDate = payload;
    },

    // setDashboardTotal: (state, { payload }) => {
    //   const { data, syskey } = payload;
    //   // console.log("payload : ", JSON.stringify(payload));
    //   const permData = [...state.DashboardPermissionData];

    //   const permission = permData.map((section) => {
    //     return {
    //       ...section,
    //       Data: section.Data.map((widget) => {
    //         if (widget.SYSKey === syskey) {
    //           return {
    //             ...widget,
    //             totalCount: data[0]?.Total ?? 0,
    //           };
    //         }
    //         return widget;
    //       }),
    //     };
    //   });
    //   console.log(
    //     "state updated data in dahboard permission  : ",
    //     JSON.stringify(permission)
    //   );
    //   state.DashboardPermissionData = permData;
    // },
  },
});

export const {
  setDashboardPermissionData,
  setDashboardLoading,
  setDashboardTotal,
  setDashboardSummary,
  setDashboardSummaryDetail,
  setDashboardReportPrint,
  setReportType,
  setStateFromDate,
  setStateToDate,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
