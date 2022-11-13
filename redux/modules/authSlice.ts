import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { User } from "../../utils/types";
import { env } from "process";

// Type for our state
export interface AuthState {
  authState: boolean;
  authUser: Partial<User>;
}

// Initial state
const initialState: AuthState = {
  authState: process.env.NODE_ENV !== "production",
  authUser:
    process.env.NODE_ENV !== "production" ? { githubId: "lhjeong60" } : {},
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

    setAuthUser(state, action) {
      state.authUser = action.payload;
    },

    resetAuth(state) {
      state.authState = false;
      state.authUser = {};
    },
  },
});

export const { setAuthState, setAuthUser, resetAuth } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectAuthUser = (state: AppState) => state.auth.authUser;

export default authSlice.reducer;
