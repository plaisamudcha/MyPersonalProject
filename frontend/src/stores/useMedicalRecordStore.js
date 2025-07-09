import { create } from "zustand";
import useUserStore from "./useUserStore";
import doctorToBackend from "../api/doctorApi";

const useMedicalRecordStore = create((set, get) => ({
  medicalRecords: [],
  medicalRecordsByPatientId: [],
  getMedicalRecordsByPatientId: async (id) => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.getMedicalRecordsByPatientId(id, token);
    set({ medicalRecordsByPatientId: res.data.medicalRecords });
  },
  getAllMedicalRecords: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.getAllMedicalRecords(token);
    set({ medicalRecords: res.data.medicalRecords });
  },
  createMedicalRecord: async (input) => {
    const token = useUserStore.getState().accessToken;
    const res = await doctorToBackend.createMedicalRecord(input, token);
    get().getMedicalRecordsByPatientId();
    return res;
  },
}));

export default useMedicalRecordStore;
