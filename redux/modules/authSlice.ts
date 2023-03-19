import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@utils/types";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@redux/store/store";
import { resetToken } from "@token/index";

// Type for our state
export interface AuthState {
  authUser: User | null;
}

// Initial state
const initialState: AuthState = {
  authUser: null,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<User>) {
      state.authUser = action.payload;
    },

    resetAuth(state) {
      state.authUser = null;
      resetToken();
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

export const { setAuthUser, resetAuth } = authSlice.actions;

export const selectAuthUser = (state: RootState) => state.auth.authUser;

export default authSlice.reducer;
