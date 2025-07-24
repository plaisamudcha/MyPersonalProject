import { create } from "zustand";
import doctorToBackend from "../api/doctorApi";
import adminToBackend from "../api/adminApi";

const usePrescriptionStore = create((set, get) => ({
  prescriptions: [],
  getAllPrescriptionsByAdmin: async (id) => {
    const res = await adminToBackend.getAllPrescriptions(id);
    set({ prescriptions: res.data.prescriptions });
  },
  getAllPrescriptions: async () => {
    const res = await doctorToBackend.getAllPrescriptions();
    set({ prescriptions: res.data.prescriptions });
  },
  createPrescription: async (input) => {
    const res = await doctorToBackend.createPrescription(input);
    get().getAllPrescriptions();
    return res;
  },
  updatePrescriptionById: async (id, input) => {
    const res = await adminToBackend.updatePrescriptionByid(id, input);
    get().getAllPrescriptions();
    return res;
  },
}));

export default usePrescriptionStore;
