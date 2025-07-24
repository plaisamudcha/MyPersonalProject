import { create } from "zustand";
import authToBackend from "../api/authApi";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      doctors: [],
      accessToken: "",
      resetToken: "",
      setAccessToken: (token) => set({ accessToken: token }),
      setResetToken: (token) => set({ resetToken: token }),
      login: async (input) => {
        const res = await authToBackend.login(input);
        set({ user: res.data.user, accessToken: res.data.accessToken });
        return res;
      },
      forgotPassword: async (input) => {
        const res = await authToBackend.forgotPassword(input);
        return res;
      },
      resetPassword: async (input, token) => {
        const res = await authToBackend.resetPassword(input, token);
        return res;
      },
      getPublicDoctor: async () => {
        const res = await authToBackend.getPublicDoctor();
        set({ doctors: res.data.doctors });
      },
      logout: async () => {
        set({ user: null, doctors: [], accessToken: "", resetToken: "" });
      },
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
