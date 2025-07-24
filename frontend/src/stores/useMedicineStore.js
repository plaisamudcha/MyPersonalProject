import { create } from "zustand";
import adminToBackend from "../api/adminApi";

const useMedicineStore = create((set, get) => ({
  totalData: null,
  medicines: [],
  getAllMedicines: async (page, limit, name, form) => {
    const res = await adminToBackend.getAllMedicines(page, limit, name, form);
    set({
      totalData: res.data.medicines.total,
      medicines: res.data.medicines.medicines,
    });
    return res.data;
  },
  createMedicine: async (input, page, limit) => {
    const res = await adminToBackend.createMedicine(input);
    get().getAllMedicines(page, limit, "", "");
    return res;
  },
  updateMedicine: async (id, input, page, limit) => {
    const res = await adminToBackend.updateMedicine(id, input);
    get().getAllMedicines(page, limit, "", "");
    return res;
  },
}));

export default useMedicineStore;
