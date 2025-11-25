import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTokensFromLocalStorage,
  removeTokensFromLocalStorage,
} from "helpers/tokensUtils";
import { login, logout, signUp } from "services/authService";
import { clearAuthState } from "./authSlice";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginCreds, { rejectWithValue }) => {
    try {
      const tokens = await login(loginCreds);
      return tokens;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (singUpCreds, { rejectWithValue }) => {
    try {
      await signUp(singUpCreds);
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Sign Up failed");
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const refreshToken = getTokensFromLocalStorage()?.refreshToken;
      await logout({ refreshToken });
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Logout failed");
    } finally {
      removeTokensFromLocalStorage();
      dispatch(clearAuthState());
    }
  }
);
