import { create } from "zustand";
import useUserStore from "./useUserStore";
import doctorToBackend from "../api/doctorApi";
import adminToBackend from "../api/adminApi";

const usePrescriptionStore = create((set, get) => ({
  prescriptions: [],
  getAllPrescriptionsByAdmin: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllPrescriptions(id, token);
    set({ prescriptions: res.data.prescriptions });
  },
  getAllPrescriptions: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.getAllPrescriptions(token);
    set({ prescriptions: res.data.prescriptions });
  },
  createPrescription: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.createPrescription(input, token);
    get().getAllPrescriptions();
    return res;
  },
  updatePrescriptionById: async (id, input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updatePrescriptionByid(id, input, token);
    get().getAllPrescriptions();
    return res;
  },
}));

export default usePrescriptionStore;
