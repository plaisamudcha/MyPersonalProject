import axios from "axios";

const doctorsApi = axios.create({
  baseURL: "http://localhost:3026/api/appointments",
});

const medicalApi = axios.create({
  baseURL: "http://localhost:3026/api/medical-records",
});

const precriptionApi = axios.create({
  baseURL: "http://localhost:3026/api/prescriptions",
});

const bearerToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const doctorToBackend = {
  getAllAppointments: (token) => doctorsApi.get("/doctors", bearerToken(token)),
  getAllMedicalRecords: (token) =>
    medicalApi.get("/doctors", bearerToken(token)),
  getMedicalRecordsByPatientId: (id, token) =>
    medicalApi.get(`/patients/${id}`, bearerToken(token)),
  createMedicalRecord: (body, token) =>
    medicalApi.post("/", body, bearerToken(token)),
  getAllPrescriptions: (token) =>
    precriptionApi.get("/doctors", bearerToken(token)),
  createPrescription: (body, token) =>
    precriptionApi.post("/", body, bearerToken(token)),
};

export default doctorToBackend;
