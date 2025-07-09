import axios from "axios";

const doctorsApi = axios.create({
  baseURL: "http://localhost:3026/api/doctors",
});

const patientApi = axios.create({
  baseURL: "http://localhost:3026/api/patients",
});

const appointmentApi = axios.create({
  baseURL: "http://localhost:3026/api/appointments",
});

const prescriptionApi = axios.create({
  baseURL: "http://localhost:3026/api/prescriptions",
});

const medicineApi = axios.create({
  baseURL: "http://localhost:3026/api/medicines",
});

const stockLogApi = axios.create({
  baseURL: "http://localhost:3026/api/stock-logs",
});

const paymentApi = axios.create({
  baseURL: "http://localhost:3026/api/payments",
});

const bearerToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const adminToBackend = {
  getAllDoctors: (token) => doctorsApi.get("/", bearerToken(token)),
  deleteDoctor: (id, token) =>
    doctorsApi.patch(`/${id}`, {}, bearerToken(token)),
  updateDoctor: (id, body, token) =>
    doctorsApi.put(`/${id}`, body, bearerToken(token)),
  getAllPatients: (token) => patientApi.get("/", bearerToken(token)),
  deletePatient: (id, token) =>
    patientApi.patch(`/${id}`, {}, bearerToken(token)),
  updatePatient: (id, body, token) =>
    patientApi.put(`/${id}`, body, bearerToken(token)),
  getAllAppointments: (token) => appointmentApi.get(`/`, bearerToken(token)),
  createAppointment: (body, token) =>
    appointmentApi.post("/", body, bearerToken(token)),
  deleteAppointment: (id, token) =>
    appointmentApi.delete(`/${id}`, bearerToken(token)),
  updateStatusAppointment: (id, status, token) =>
    appointmentApi.patch(`/${id}`, status, bearerToken(token)),
  updateAppointment: (id, body, token) =>
    appointmentApi.put(`/${id}`, body, bearerToken(token)),
  getAllMedicines: (token) => medicineApi.get(`/`, bearerToken(token)),
  createMedicine: (body, token) =>
    medicineApi.post("/", body, bearerToken(token)),
  updateMedicine: (id, body, token) =>
    medicineApi.put(`/${id}`, body, bearerToken(token)),
  getAllStockLogs: (token) => stockLogApi.get(`/`, bearerToken(token)),
  createStockLog: (body, token) =>
    stockLogApi.post("/", body, bearerToken(token)),
  getAllPrescriptions: (id, token) =>
    prescriptionApi.get(`/appointment/${id}`, bearerToken(token)),
  createPayment: (input, token) =>
    paymentApi.post("/", input, bearerToken(token)),
  getAllPayments: (token) => paymentApi.get("/", bearerToken(token)),
  getPaymentByAppointmentId: (id, token) =>
    paymentApi.get(`/appointment/${id}`, bearerToken(token)),
  upDatePaymentStatus: (id, input, token) =>
    paymentApi.patch(`/${id}`, input, bearerToken(token)),
  updatePrescriptionByid: (id, body, token) =>
    prescriptionApi.patch(`${id}`, body, bearerToken(token)),
};

export default adminToBackend;
