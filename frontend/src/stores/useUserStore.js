import { create } from "zustand";
import authToBackend from "../api/authApi";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      doctors: [],
      accessToken: "",
      resetToken: "",
      login: async (input) => {
        const res = await authToBackend.login(input);
        set({ user: res.data.user, accessToken: res.data.accessToken });
        return res;
      },
      forgotPassword: async (input) => {
        const res = await authToBackend.forgotPassword(input);
        let arrLink = res.data.link.split("/");
        let token = arrLink[arrLink.length - 1];
        set({ resetToken: token });
        return res;
      },
      resetPassword: async (input) => {
        const res = await authToBackend.resetPassword(input, get().resetToken);
        set({ resetToken: "" });
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
