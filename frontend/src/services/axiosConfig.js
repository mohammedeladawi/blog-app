import axios from "axios";
import { store } from "store";
// import store from "../store";

const API_BASE_URL = "http://localhost:5287/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.tokens.refreshToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // Handle global response errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(logout()); // auto logout on 401
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
