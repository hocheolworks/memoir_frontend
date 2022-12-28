import { CombinedState, combineReducers } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import storage from "../storage";
import auth, { AuthState } from "./authSlice";
import { PersistConfig, persistReducer } from "redux-persist";

export type RootState = CombinedState<{ auth: AuthState }> | undefined;

const rootReducer = combineReducers({ auth });

const persistConfig: PersistConfig<
  CombinedState<{ auth: AuthState }>,
  any,
  any,
  any
> = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
