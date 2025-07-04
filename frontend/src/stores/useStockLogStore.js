import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";

const useStockLogStore = create((set, get) => ({
  stockLogs: [],
  getAllStockLogs: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllStockLogs(token);
    set({ stockLogs: res.data.stocks });
    return res;
  },
  createStockLog: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.createStockLog(input, token);
    get().getAllStockLogs();
    return res;
  },
}));

export default useStockLogStore;
