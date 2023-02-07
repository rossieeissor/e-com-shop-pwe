import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: string | null;
};

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<UserData>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },

    signFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    signOutstart(state) {
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const { signInSuccess, signFailed, signOutstart } = userSlice.actions;

export default userSlice.reducer;
