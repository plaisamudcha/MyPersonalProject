import axios from "axios";

const doctorsApi = axios.create({
  baseURL: "http://localhost:3026/api/appointments",
});

const bearerToken = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const doctorToBackend = {
  getAllAppointments: (token) => doctorsApi.get("/doctors", bearerToken(token)),
};

export default doctorToBackend;
