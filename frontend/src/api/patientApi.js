import { authApi } from "./baseApi";

const patientToBackend = {
  getAppointmentsByPatientId: () => authApi.get(`/appointments/patients`),
  getPaymentByPatientId: () => authApi.get("/payments/patients"),
};

export default patientToBackend;
