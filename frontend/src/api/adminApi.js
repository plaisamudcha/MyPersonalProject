import { authApi } from "./baseApi";

const adminToBackend = {
  getAllDoctors: (name) => authApi.get(`/doctors/?name=${name}`),
  deleteDoctor: (id) => authApi.patch(`/doctors/${id}`),
  updateDoctor: (id, body) => authApi.put(`/doctors/${id}`, body),
  getAllPatients: (name) => authApi.get(`/patients/?name=${name}`),
  deletePatient: (id) => authApi.patch(`/patients/${id}`),
  updatePatient: (id, body) => authApi.put(`/patients/${id}`, body),
  getAllAppointments: (page, limit, docName, patName) =>
    authApi.get(
      `/appointments/?page=${page}&limit=${limit}&docName=${docName}&patName=${patName}`
    ),
  createAppointment: (body) => authApi.post("/appointments", body),
  deleteAppointment: (id) => authApi.delete(`/appointments/${id}`),
  updateStatusAppointment: (id, status) =>
    authApi.patch(`/appointments/${id}`, status),
  updateAppointment: (id, body) => authApi.put(`/appointments/${id}`, body),
  getAllMedicines: (page, limit, name, form) =>
    authApi.get(
      `/medicines/?page=${page}&limit=${limit}&name=${name}&form=${form}`
    ),
  createMedicine: (body) => authApi.post("/medicines", body),
  updateMedicine: (id, body) => authApi.put(`/medicines/${id}`, body),
  getAllStockLogs: (page, limit, name) =>
    authApi.get(`/stock-logs/?page=${page}&limit=${limit}&name=${name}`),
  createStockLog: (body) => authApi.post("/stock-logs/", body),
  getAllPrescriptions: (id) => authApi.get(`/prescriptions/appointment/${id}`),
  updatePrescriptionByid: (id, body) =>
    authApi.patch(`/prescriptions/${id}`, body),
  createPayment: (input) => authApi.post("/payments", input),
  getAllPayments: (page, limit, name) =>
    authApi.get(`/payments/?page=${page}&limit=${limit}&name=${name}`),
  getPaymentByAppointmentId: (id) => authApi.get(`/payments/appointment/${id}`),
  upDatePaymentStatus: (id, input) => authApi.patch(`/payments/${id}`, input),
};

export default adminToBackend;
