import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "../modules/authSlice";
import reducer from "../modules";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer,
    // reducer: {
    //   [authSlice.name]: authSlice.reducer,
    // },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
