import { authApi } from "./baseApi";

const doctorToBackend = {
  getAllAppointments: (page, limit, name, status) =>
    authApi.get(
      `/appointments/doctors/?page=${page}&limit=${limit}&name=${name}&status=${status}`
    ),
  getAppointmentById: (id) => authApi.get(`/appointments/${id}`),
  getAllMedicalRecords: (page, limit, name) =>
    authApi.get(
      `/medical-records/doctors/?page=${page}&limit=${limit}&name=${name}`
    ),
  getMedicalRecordsByPatientId: (id) =>
    authApi.get(`/medical-records/patients/${id}`),
  createMedicalRecord: (body) => authApi.post("/medical-records", body),
  getAllPrescriptions: () => authApi.get("/prescriptions/doctors"),
  createPrescription: (body) => authApi.post("/prescriptions", body),
};

export default doctorToBackend;
