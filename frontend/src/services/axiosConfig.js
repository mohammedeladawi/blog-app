import axios from "axios";
import {
  getTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "helpers/tokensUtils";
import { refreshAccessToken } from "./authService";

const API_BASE_URL = "http://localhost:5287/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request
axiosInstance.interceptors.request.use((config) => {
  // Avoid importing the Redux store here to prevent circular imports.
  // Read tokens directly from localStorage instead.
  const token = getTokensFromLocalStorage()?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getTokensFromLocalStorage()?.refreshToken;
        if (!refreshToken) throw new Error("Refresh does not exist!");

        const newTokens = await refreshAccessToken({ refreshToken });
        saveTokensToLocalStorage(newTokens);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newTokens.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (_) {
        // Force logout handled outside
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
