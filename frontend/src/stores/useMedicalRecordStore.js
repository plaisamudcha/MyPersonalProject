import { create } from "zustand";
import doctorToBackend from "../api/doctorApi";

const useMedicalRecordStore = create((set, get) => ({
  totalData: null,
  medicalRecords: [],
  medicalRecordsByPatientId: [],
  getMedicalRecordsByPatientId: async (id) => {
    const res = await doctorToBackend.getMedicalRecordsByPatientId(id);
    set({ medicalRecordsByPatientId: res.data.medicalRecords });
  },
  getAllMedicalRecords: async (page, limit, name) => {
    const res = await doctorToBackend.getAllMedicalRecords(page, limit, name);
    set({
      totalData: res.data.medicalRecords.total,
      medicalRecords: res.data.medicalRecords.medicalRecords,
    });
  },
  createMedicalRecord: async (input, page, limit) => {
    const res = await doctorToBackend.createMedicalRecord(input);
    get().getMedicalRecordsByPatientId(page, limit, "");
    return res;
  },
}));

export default useMedicalRecordStore;
