import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login, logout } from "../../services/auth";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await register(userData);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      return await login(userData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      return await logout();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
