import { create } from "zustand";
import adminToBackend from "../api/adminApi";
import useUserStore from "./useUserStore";
import doctorToBackend from "../api/doctorApi";
import patientToBackend from "../api/patientApi";

const useAppointmentStore = create((set, get) => ({
  appointments: [],
  appointmentsByPatientId: [],
  appointmentsByDoctorId: [],
  getAllAppointments: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.getAllAppointments(token);
    set({ appointments: res.data.allAppointments });
  },
  createAppointment: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.createAppointment(input, token);
    get().getAllAppointments();
    return res;
  },
  deleteAppointment: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.deleteAppointment(id, token);
    get().getAllAppointments();
    return res;
  },
  updateStatusAppointment: async (id, status) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updateStatusAppointment(id, status, token);
    get().getAllAppointments();
    return res;
  },
  updateAppointment: async (id, body) => {
    const token = useUserStore.getState().accessToken;
    const res = await adminToBackend.updateAppointment(id, body, token);
    get().getAllAppointments();
    return res;
  },
  getAllAppointmentsByDoctor: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.getAllAppointments(token);
    set({ appointmentsByDoctorId: res.data.appointments });
    return res;
  },
  getAppointmentsByPatientId: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await patientToBackend.getAppointmentsByPatientId(token);
    set({ appointmentsByPatientId: res.data.appointments });
    return res;
  },
}));

export default useAppointmentStore;
