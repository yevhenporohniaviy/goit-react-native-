import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(
        (a) => a.type.startsWith("user/") && a.type.endsWith("pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (a) => a.type.startsWith("user/") && a.type.endsWith("rejected"),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
});

export const { resetError } = userSlice.actions;

export default userSlice.reducer;
