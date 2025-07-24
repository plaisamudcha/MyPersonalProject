import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";

const useStockLogStore = create((set, get) => ({
  totalData: null,
  stockLogs: [],
  getAllStockLogs: async (page, limit, name) => {
    const res = await adminToBackend.getAllStockLogs(page, limit, name);
    set({
      totalData: res.data.stocks.total,
      stockLogs: res.data.stocks.stockLogs,
    });
    return res;
  },
  createStockLog: async (input, page, limit) => {
    const res = await adminToBackend.createStockLog(input);
    get().getAllStockLogs(page, limit, "");
    return res;
  },
}));

export default useStockLogStore;
