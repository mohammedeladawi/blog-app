import { createSlice } from "@reduxjs/toolkit";
import {
  getTokensFromLocalStorage,
  getUserIdFromToken,
  saveTokensToLocalStorage,
} from "helpers/tokensUtils";
import { loginAsync, signUpAsync } from "./authThunks";

const setError = (state, action) => {
  state.tokens = null;
  state.loading = false;
  state.error = action.payload;
  state.isAuthenticated = false;
  state.userId = null;
};

const setLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const storedTokens = getTokensFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    tokens: storedTokens,
    isAuthenticated: !!storedTokens,
    userId: getUserIdFromToken(storedTokens?.accessToken),
    loading: false,
    error: null,
  },
  reducers: {
    loadTokensFromLocalStorage: (state) => {
      const tokens = getTokensFromLocalStorage();
      state.tokens = tokens;
      state.loading = false;
      state.error = null;
    },
    clearAuthState: (state) => {
      state.tokens = null;
      state.isAuthenticated = false;
      state.userId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, setLoading)
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tokens = action.payload;
        state.isAuthenticated = true;
        state.userId = getUserIdFromToken(action.payload.accessToken);

        saveTokensToLocalStorage(action.payload);
      })
      .addCase(loginAsync.rejected, setError)
      .addCase(signUpAsync.pending, setLoading)
      .addCase(signUpAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, setError);
  },
});

export const { loadTokensFromLocalStorage, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
