import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@redux/store/store";

type LoadingInfo = {
  type: "scale" | "grid";
  text: string;
};

// Type for our state
export interface ConfigState {
  headerVisible: boolean;
  loadingVisible: boolean;
  loadingInfo: LoadingInfo;
}

// Initial state
const initialState: ConfigState = {
  headerVisible: true,
  loadingVisible: false,
  loadingInfo: {
    type: "scale",
    text: "",
  },
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

    showLoading(state, action?: PayloadAction<LoadingInfo>) {
      state.loadingVisible = true;
      if (action?.payload) state.loadingInfo = { ...action.payload };
    },
    hideLoading(state) {
      state.loadingVisible = false;
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

export const { showHeader, hideHeader, showLoading, hideLoading } =
  configSlice.actions;

export const selectHeaderVisible = (state: RootState) =>
  state.config.headerVisible;

export const selectLoadingVisible = (state: RootState) =>
  state.config.loadingVisible;

export const selectLoadingInfo = (state: RootState) => state.config.loadingInfo;

export default configSlice.reducer;
