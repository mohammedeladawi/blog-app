import { getTokensFromLocalStorage } from "helpers/tokensUtils";
import axiosInstance from "./axiosConfig";

const login = async (creds) => {
  const response = await axiosInstance.post("auth/login", creds);
  return response.data;
};

const signUp = async (creds) => {
  const response = await axiosInstance.post("auth/signup", creds);
  return response.data;
};

const logout = async (refreshToken) => {
  const response = await axiosInstance.post("auth/logout", refreshToken);
  return response.data;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await axiosInstance.post("auth/refresh-token", refreshToken);
  return response.data;
};

export { login, signUp, logout, refreshAccessToken };
