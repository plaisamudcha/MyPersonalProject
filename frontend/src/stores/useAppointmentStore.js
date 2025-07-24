import { create } from "zustand";
import adminToBackend from "../api/adminApi";
import doctorToBackend from "../api/doctorApi";
import patientToBackend from "../api/patientApi";

const useAppointmentStore = create((set, get) => ({
  appointments: [],
  appointmentById: {},
  totalData: null,
  appointmentsByPatientId: [],
  appointmentsByDoctorId: [],
  getAllAppointments: async (page, limit, docName, patName) => {
    const res = await adminToBackend.getAllAppointments(
      page,
      limit,
      docName,
      patName
    );
    set({
      appointments: res.data.allAppointments.data,
      totalData: res.data.allAppointments.total,
    });
  },
  getAppointmentById: async (id) => {
    const res = await doctorToBackend.getAppointmentById(id);
    set({ appointmentById: res.data.appointment });
  },
  createAppointment: async (input, page, limit) => {
    const res = await adminToBackend.createAppointment(input);
    get().getAllAppointments(page, limit, "", "");
    return res;
  },
  // deleteAppointment: async (id) => {
  //   const res = await adminToBackend.deleteAppointment(id);
  //   get().getAllAppointments();
  //   return res;
  // },
  updateStatusAppointment: async (id, status, page, limit) => {
    const res = await adminToBackend.updateStatusAppointment(id, status);
    get().getAllAppointments(page, limit, "", "");
    return res;
  },
  updateAppointment: async (id, body) => {
    const res = await adminToBackend.updateAppointment(id, body);
    get().getAllAppointments(page, limit, "", "");
    return res;
  },
  getAllAppointmentsByDoctor: async (page, limit, name, status) => {
    const res = await doctorToBackend.getAllAppointments(
      page,
      limit,
      name,
      status
    );
    set({
      totalData: res.data.appointments.total,
      appointmentsByDoctorId: res.data.appointments.appointments,
    });
    return res;
  },
  getAppointmentsByPatientId: async () => {
    const res = await patientToBackend.getAppointmentsByPatientId();
    set({ appointmentsByPatientId: res.data.appointments });
    return res;
  },
}));

export default useAppointmentStore;
