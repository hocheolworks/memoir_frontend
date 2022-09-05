import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import auth, { AuthState } from "./authSlice";

const reducer = (
  state: CombinedState<{ auth: AuthState }> | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    auth,
    // 여기에 추가
  })(state, action);
};

export default reducer;
