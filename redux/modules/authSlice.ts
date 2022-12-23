import { createSlice, EmptyObject } from "@reduxjs/toolkit";
import { AppState } from "../store/store";
import { User } from "../../utils/types";
import { env } from "process";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  authState: boolean;
  authUser: Partial<User>;
}

// Initial state
const initialState: AuthState = {
  authState: process.env.NODE_ENV !== "production",
  authUser:
    process.env.NODE_ENV !== "production"
      ? {
          githubId: "lhjeong60",
          avatar: "https://avatars.githubusercontent.com/u/66653704?s=40&v=4",
          name: "이호정",
          isMember: true,
          description: "내가 제일 짱",
          location: "꼬레아",
          githubAccessToken: process.env.NEXT_PUBLIC_GITHUB_PAT_FOR_TEST, //expire on Tue, Dec 27 2022.
          memoirAccessToken: "tokenmemoirmemoir",
        }
      : {},
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
      state.authState = action.payload.isMember;
      state.authUser = action.payload;
    },

    resetAuth(state) {
      state.authState = false;
      state.authUser = {};
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
      };
    },
  },
});

export const { setAuthState, setAuthUser, resetAuth } = authSlice.actions;

export const selectAuthState = (state: AppState) => state.auth.authState;
export const selectAuthUser = (state: AppState) => state.auth.authUser;

export default authSlice.reducer;
