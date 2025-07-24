import { create } from "zustand";
import adminToBackend from "../api/adminApi";

const useDoctorStore = create((set, get) => ({
  doctors: [],
  getAllDoctors: async (name) => {
    const res = await adminToBackend.getAllDoctors(name);
    set({ doctors: res.data.allDoctors });
    return res;
  },
  deleteDoctor: async (id, name) => {
    const res = await adminToBackend.deleteDoctor(id);
    get().getAllDoctors(name);
    return res;
  },
  updateDoctor: async (id, input, name) => {
    const res = await adminToBackend.updateDoctor(id, input);
    get().getAllDoctors(name);
    return res;
  },
}));

export default useDoctorStore;
