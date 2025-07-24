import { create } from "zustand";
import adminToBackend from "../api/adminApi";

const usePatientStore = create((set, get) => ({
  patients: [],
  getAllPatients: async (name) => {
    const res = await adminToBackend.getAllPatients(name);
    set({ patients: res.data.allPatients });
    return res;
  },
  deletePatient: async (id, name) => {
    const res = await adminToBackend.deletePatient(id);
    get().getAllPatients(name);
    return res;
  },
  updatePatient: async (id, input, name) => {
    const res = await adminToBackend.updatePatient(id, input);
    get().getAllPatients(name);
    return res;
  },
}));

export default usePatientStore;
