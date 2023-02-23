import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@utils/types";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@redux/store/store";

// Type for our state
export interface AuthState {
  authState: boolean;
  authUser: Partial<User>;
}

// Initial state
const initialState: AuthState = {
  authState: false,
  authUser: {},
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action: PayloadAction<boolean>) {
      state.authState = action.payload;
    },

    setAuthUser(state, action: PayloadAction<Partial<User>>) {
      state.authState = action.payload.isMember ?? false;
      state.authUser = action.payload;
    },

    resetAuth(state) {
      state.authState = false;
      state.authUser = {};
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

export const { setAuthState, setAuthUser, resetAuth } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth.authState;
export const selectAuthUser = (state: RootState) => state.auth.authUser;

export default authSlice.reducer;
