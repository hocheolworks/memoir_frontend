import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducer from "../modules";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// const persistConfig = {
//   key: "root",
//   storage: storageSession,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

const makeStore = () =>
  configureStore({
    reducer: reducer,
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
