import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@redux/store/store";

// Type for our state
export interface ConfigState {
  headerVisible: boolean;
}

// Initial state
const initialState: ConfigState = {
  headerVisible: true,
};

// Actual Slice
export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    showHeader(state) {
      state.headerVisible = true;
    },

    hideHeader(state) {
      state.headerVisible = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { showHeader, hideHeader } = configSlice.actions;

export const selectHeaderVisible = (state: RootState) =>
  state.config.headerVisible;

export default configSlice.reducer;
