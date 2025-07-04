import { useEffect, useState } from "react";
import useAppointmentStore from "../../stores/useAppointmentStore";
import AppointmentsDoctorForm from "../../components/AppointmentsDoctorForm";
import SearchTextForm from "../../components/SearchForm";
import SearchSelectForm from "../../components/SearchSelectForm";

const status = [
  { id: 0, value: "", name: "All" },
  { id: 1, value: "SCHEDULED", name: "Schedule" },
  { id: 2, value: "COMPLETED", name: "Complete" },
];

function AppointmentsPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const appointments = useAppointmentStore((state) => state.appointments);
  const getAllAppointmentsByDoctor = useAppointmentStore(
    (state) => state.getAllAppointmentsByDoctor
  );
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  useEffect(() => {
    getAllAppointmentsByDoctor();
  }, []);
  useEffect(() => {
    const result = appointments.filter((el) => {
      const patientName =
        `${el.patient?.user?.firstName} ${el.patient?.user?.lastName}`.toLowerCase();
      const matchPatient = patientName.includes(patientSearch.toLowerCase());
      const matchStatus = statusFilter ? el.status === statusFilter : true;
      return matchPatient && matchStatus;
    });
    setFilteredAppointments(result);
  }, [patientSearch, statusFilter, appointments]);
  return (
    <>
      <div className="relative flex flex-col gap-7 overflow-auto">
        <h1 className="text-3xl font-bold text-center">
          List of all appointments : {filteredAppointments.length}
        </h1>
        <div className="flex border p-2 rounded-xl shadow-md justify-around">
          <SearchTextForm
            head="Search by Patient name"
            search={patientSearch}
            setSearch={setPatientSearch}
          />
          <SearchSelectForm
            head="Search by status"
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            array={status}
          />
        </div>
        <div className="w-full">
          <table className="table table-auto w-full">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="font-bold ">
              {filteredAppointments.map((el) => (
                <AppointmentsDoctorForm key={el.id} el={el} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AppointmentsPage;
