import { CombinedState, combineReducers } from "@reduxjs/toolkit";
import storage from "@redux/storage";
import auth, { AuthState } from "./authSlice";
import { PersistConfig, persistReducer } from "redux-persist";
import config, { ConfigState } from "./configSlice";

export type IntegratedState = CombinedState<{
  auth: AuthState;
  config: ConfigState;
}>;

export type RootState = IntegratedState | undefined;

const rootReducer = combineReducers({ auth, config });

const persistConfig: PersistConfig<IntegratedState, any, any, any> = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth", "config"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
