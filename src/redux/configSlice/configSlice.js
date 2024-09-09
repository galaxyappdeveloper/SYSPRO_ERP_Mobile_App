import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  company: [],
  yearDuration: [],
  premise: [],
  location: [],
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCompany: (state, action) => {
      state.company = action.payload;
    },

    setYearDuration: (state, action) => {
      state.yearDuration = action.payload;
    },

    setPremise: (state, action) => {
      state.premise = action.payload;
    },

    setLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const {
  setLoading,
  setCompany,
  setPremise,
  setYearDuration,
  setLocation,
} = configSlice.actions;

export default configSlice.reducer;
