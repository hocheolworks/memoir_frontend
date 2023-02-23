import {
  configureStore,
  ThunkAction,
  Action,
  EnhancedStore,
  Store,
} from "@reduxjs/toolkit";
import persistedReducer from "@redux/modules";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
