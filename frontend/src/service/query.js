import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import adminToBackend from "../api/adminApi";
import useUserStore from "../stores/useUserStore";

const token = useUserStore((state) => state.accessToken);

const fetchAppointment = async () => {
  const res = await adminToBackend.getAllPatients(token);
  return res.data.patients;
};

export default fetchAppointment;
