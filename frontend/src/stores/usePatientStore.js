import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";

const usePatientStore = create((set, get) => ({
  patients: [],
  getAllPatients: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllPatients(token);
    set({ patients: res.data.allPatients });
    return res;
  },
  deletePatient: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.deletePatient(id, token);
    get().getAllPatients();
    return res;
  },
  updatePatient: async (id, input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updatePatient(id, input, token);
    get().getAllPatients();
    return res;
  },
}));

export default usePatientStore;
