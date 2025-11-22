import { createSlice } from "@reduxjs/toolkit";
import {
  getTokensFromLocalStorage,
  getUsernameFromToken,
  removeTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "helpers/tokensUtils";
import { loginAsync, logoutAsync, signUpAsync } from "./authThunks";

const setError = (state, action) => {
  state.tokens = null;
  state.loading = false;
  state.error = action.payload;
  state.isAuthenticated = false;
  state.username = null;
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
    username: getUsernameFromToken(storedTokens?.accessToken),
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
      state.username = null;
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
        state.username = getUsernameFromToken(action.payload.accessToken);

        saveTokensToLocalStorage(action.payload);
      })
      .addCase(loginAsync.rejected, setError)
      .addCase(signUpAsync.pending, setLoading)
      .addCase(signUpAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpAsync.rejected, setError)
      .addCase(logoutAsync.pending, setLoading)
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.tokens = null;
        state.username = null;
        state.isAuthenticated = false;
        removeTokensFromLocalStorage();
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadTokensFromLocalStorage, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
