import { create } from "zustand";
import adminToBackend from "../api/adminApi";
import patientToBackend from "../api/patientApi";

const usePaymentStore = create((set, get) => ({
  totalData: null,
  payments: [],
  paymentByAppointmentId: [],
  paymentByPatientId: [],
  getAllPayments: async (page, limit, name) => {
    const res = await adminToBackend.getAllPayments(page, limit, name);
    set({
      totalData: res.data.payments.total,
      payments: res.data.payments.payments,
    });
  },
  createPaymentByAppointmendId: async (input, page, limit) => {
    const res = await adminToBackend.createPayment(input);
    get().getAllPayments(page, limit, "");
    return res;
  },
  getPaymentByAppointmentId: async (id) => {
    const res = await adminToBackend.getPaymentByAppointmentId(id);
    set({ paymentByAppointmentId: res.data.payments });
  },
  updatePaymentStatus: async (id, input) => {
    const res = await adminToBackend.upDatePaymentStatus(id, input);
    get().getPaymentByAppointmentId();
    return res;
  },
  getPaymentByPatientId: async () => {
    const res = await patientToBackend.getPaymentByPatientId();
    set({ paymentByPatientId: res.data.payments });
    return res;
  },
}));

export default usePaymentStore;
