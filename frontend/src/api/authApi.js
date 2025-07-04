import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:3026/api/auth",
});

const bearerToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const authToBackend = {
  registerPatient: (body) => authApi.post("/register/patient", body),
  registerDoctor: (body, token) =>
    authApi.post("/register/doctor", body, bearerToken(token)),
  login: (body) => authApi.post("/login", body),
  forgotPassword: (body) => authApi.post("/forgot-password", body),
  resetPassword: (body, resetToken) =>
    authApi.post(`/reset-password/${resetToken}`, body),
  getPublicDoctor: () => authApi.get("/publicDoctor"),
};

export default authToBackend;
