import axios from "axios";

const appointmentApi = axios.create({
  baseURL: "http://localhost:3026/api/appointments",
});

const paymentApi = axios.create({
  baseURL: "http://localhost:3026/api/payments",
});

const bearerToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const patientToBackend = {
  getAppointmentsByPatientId: (token) =>
    appointmentApi.get(`/patients`, bearerToken(token)),
  getPaymentByPatientId: (token) =>
    paymentApi.get("/patients", bearerToken(token)),
};

export default patientToBackend;
