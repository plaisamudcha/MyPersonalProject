import { publicApi } from "./baseApi";

const authToBackend = {
  registerPatient: (body) => publicApi.post("/auth/register/patient", body),
  registerDoctor: (body) => publicApi.post("/auth/register/doctor", body),
  login: (body) => publicApi.post("/auth/login", body),
  forgotPassword: (body) => publicApi.post("/auth/forgot-password", body),
  resetPassword: (body, resetToken) =>
    publicApi.post(`/auth/reset-password/${resetToken}`, body),
  getPublicDoctor: () => publicApi.get("/auth/publicDoctor"),
};

export default authToBackend;
