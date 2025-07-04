import { create } from "zustand";
import adminToBackend from "../api/adminApi";
import useUserStore from "./useUserStore";
<<<<<<< HEAD
=======
import doctorToBackend from "../api/doctorApi";
>>>>>>> c55d519 (second commit)

const useAppointmentStore = create((set, get) => ({
  appointments: [],
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
<<<<<<< HEAD
=======
  getAllAppointmentsByDoctor: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.getAllAppointments(token);
    set({ appointments: res.data.appointments });
    return res;
  },
>>>>>>> c55d519 (second commit)
}));

export default useAppointmentStore;
