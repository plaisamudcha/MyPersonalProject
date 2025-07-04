import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";

const useMedicineStore = create((set, get) => ({
  medicines: [],
  getAllMedicines: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllMedicines(token);
    set({ medicines: res.data.medicines });
    return res;
  },
  createMedicine: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.createMedicine(input, token);
    get().getAllMedicines();
    return res;
  },
  updateMedicine: async (id, input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updateMedicine(id, input, token);
    get().getAllMedicines();
    return res;
  },
}));

export default useMedicineStore;
