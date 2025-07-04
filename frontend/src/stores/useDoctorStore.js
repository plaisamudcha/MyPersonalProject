import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";

const useDoctorStore = create((set, get) => ({
  doctors: [],
  getAllDoctors: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllDoctors(token);
    set({ doctors: res.data.allDoctors });
    return res;
  },
  deleteDoctor: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.deleteDoctor(id, token);
    get().getAllDoctors();
    return res;
  },
  updateDoctor: async (id, input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updateDoctor(id, input, token);
    get().getAllDoctors();
    return res;
  },
}));

export default useDoctorStore;
