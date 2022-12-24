import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import auth, { AuthState } from "./authSlice";

export type RootState = CombinedState<{ auth: AuthState }> | undefined;

const rootReducer = combineReducers({ auth });

const reducer = (state: RootState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state,
        ...action.payload,
      };

      return nextState;

    default:
      return rootReducer(state, action);
  }
};

export default reducer;
