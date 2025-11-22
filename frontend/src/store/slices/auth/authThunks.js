import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout, signUp } from "services/authService";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginCreds, { rejectWithValue }) => {
    try {
      const tokens = await login(loginCreds);
      return tokens;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (singUpCreds) => {
    await signUp(singUpCreds);
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (refreshToken) => {
    await logout(refreshToken);
  }
);
