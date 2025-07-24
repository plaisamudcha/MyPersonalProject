import axios from "axios";
import useUserStore from "../stores/useUserStore";

const baseConfig = {
  baseURL: "http://localhost:3026/api",
  timeout: 5000,
  withCredentials: true,
};

const publicApi = axios.create(baseConfig);

const authApi = axios.create(baseConfig);

authApi.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      // originalRequest._retry = true;
      try {
        const response = await authApi.get("/auth/refreshToken", {
          _retry: true,
        });
        const newAccessToken = response.data.accessToken;
        useUserStore.getState().setAccessToken(newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (error) {
        useUserStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export { publicApi, authApi };
