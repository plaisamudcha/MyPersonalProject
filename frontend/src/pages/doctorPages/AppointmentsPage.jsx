import { useEffect, useState } from "react";
import useAppointmentStore from "../../stores/useAppointmentStore";
import AppointmentsDoctorForm from "../../components/AppointmentsDoctorForm";
import SearchTextForm from "../../components/SearchForm";
import SearchSelectForm from "../../components/SearchSelectForm";
import PageButton from "../../components/PageButton";

const status = [
  { id: 0, value: "", name: "All" },
  { id: 1, value: "SCHEDULED", name: "Schedule" },
  { id: 2, value: "COMPLETED", name: "Complete" },
];

function AppointmentsPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalData = useAppointmentStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const appointmentsByDoctorId = useAppointmentStore(
    (state) => state.appointmentsByDoctorId
  );
  const getAllAppointmentsByDoctor = useAppointmentStore(
    (state) => state.getAllAppointmentsByDoctor
  );
  useEffect(() => {
    getAllAppointmentsByDoctor(page, limit, patientSearch, statusFilter);
  }, [page, patientSearch, statusFilter]);
  return (
    <>
      <div className="relative flex flex-col gap-7">
        <h1 className="text-3xl font-bold text-center">
          List of all appointments : {totalData}
        </h1>
        <div className="flex border p-2 rounded-xl shadow-md justify-around">
          <SearchTextForm
            head="Search by Patient name"
            search={patientSearch}
            setSearch={setPatientSearch}
          />
          <SearchSelectForm
            head="Search by appointment's status"
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            array={status}
          />
        </div>
        <div className="w-full">
          <table className="table table-auto w-full">
            <thead>
              <tr>
                <th className="text-center">Appointment ID</th>
                <th className="text-center">Patient</th>
                <th className="text-center">Name</th>
                <th className="text-center">Date</th>
                <th className="text-center">Time</th>
                <th className="text-center">Status</th>
                <th className="text-center">Medical-record</th>
              </tr>
            </thead>
            <tbody className="font-bold ">
              {appointmentsByDoctorId.map((el) => (
                <AppointmentsDoctorForm key={el.id} el={el} />
              ))}
            </tbody>
          </table>
        </div>
        <PageButton page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </>
  );
}

export default AppointmentsPage;
