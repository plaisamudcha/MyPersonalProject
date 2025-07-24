import axios from "axios";
import useUserStore from "../stores/useUserStore";

const baseConfig = {
  baseURL: "http://localhost:3026/api",
  timeout: 5000,
};

export const publicApi = axios.create(baseConfig);

export const authApi = axios.create(baseConfig);

authApi.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
