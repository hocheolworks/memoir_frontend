import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import auth, { AuthState } from "./authSlice";

export type RootState = CombinedState<{ auth: AuthState }> | undefined;

const reducer = (state: RootState, action: AnyAction) => {
  switch (action.type) {
    // case HYDRATE:
    //   console.log(action.state);
    //   console.log(action.payload);

    //   const nextState = {
    //     ...state,
    //     ...action.payload,
    //   };

    //   return nextState;
    default:
      return combineReducers({
        auth,
        // 여기에 추가
      })(state, action);
  }
};

export default reducer;
