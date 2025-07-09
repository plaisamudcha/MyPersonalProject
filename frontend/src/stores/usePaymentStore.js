import { create } from "zustand";
import useUserStore from "./useUserStore";
import adminToBackend from "../api/adminApi";
import patientToBackend from "../api/patientApi";

const usePaymentStore = create((set, get) => ({
  payments: [],
  paymentByAppointmentId: [],
  paymentByPatientId: [],
  getAllPayments: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllPayments(token);
    set({ payments: res.data.payments });
  },
  createPaymentByAppointmendId: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.createPayment(input, token);
    get().getAllPayments();
    return res;
  },
  getPaymentByAppointmentId: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getPaymentByAppointmentId(id, token);
    set({ paymentByAppointmentId: res.data.payments });
  },
  updatePaymentStatus: async (id, input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.upDatePaymentStatus(id, input, token);
    get().getPaymentByAppointmentId();
    return res;
  },
  getPaymentByPatientId: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await patientToBackend.getPaymentByPatientId(token);
    set({ paymentByPatientId: res.data.payments });
    return res;
  },
}));

export default usePaymentStore;
