import { useEffect, useState } from "react";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import AppointmentsForm from "../../../components/AppointmentsForm";
import EditAppointmentPage from "./EditAppointmentPage";
import CreateAppointmentPage from "./CreateAppointmentPage";
import SearchTextForm from "../../../components/SearchForm";
import SearchSelectForm from "../../../components/SearchSelectForm";
import CreateButton from "../../../components/CreateButton";

const status = [
  { id: 0, value: "", name: "All" },
  { id: 1, value: "SCHEDULED", name: "Schedule" },
  { id: 2, value: "COMPLETED", name: "Complete" },
];

function AppointmentsListPage() {
  const [resetForm, setResetForm] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const appointments = useAppointmentStore((state) => state.appointments);
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  useEffect(() => {
    getAllAppointments();
  }, []);
  const hdlClose = () => {
    setResetForm((prv) => !prv);
  };
  useEffect(() => {
    const result = appointments.filter((el) => {
      const doctorName =
        `${el.doctor.firstName} ${el.doctor.lastName}`.toLowerCase();
      const patientName =
        `${el.patient.firstName} ${el.patient.lastName}`.toLowerCase();
      const matchDoctor = doctorName.includes(doctorSearch.toLowerCase());
      const matchPatient = patientName.includes(patientSearch.toLowerCase());
      const matchStatus = statusFilter ? el.status === statusFilter : true;
      return matchDoctor && matchPatient && matchStatus;
    });
    setFilteredAppointments(result);
  }, [doctorSearch, patientSearch, statusFilter, appointments]);
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all appointments : {filteredAppointments.length}
      </h1>
      <CreateButton
        head={"Create new appointment"}
        modalID={"createAppointment-form"}
      />
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by doctor"
          search={doctorSearch}
          setSearch={setDoctorSearch}
        />
        <SearchTextForm
          head="Search by doctor"
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
      <div className="w-full ">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th className="text-center">Appointment ID</th>
              <th className="text-center">Doctor ID</th>
              <th className="text-center">Doctor Name</th>
              <th className="text-center">Patient ID</th>
              <th className="text-center">Patient Name</th>
              <th className="text-center">Date</th>
              <th className="text-center">Time</th>
              <th className="text-center">Status</th>
              <th className="text-center">Edit appointment</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((el) => (
              <AppointmentsForm key={el.id} el={el} />
            ))}
          </tbody>
        </table>
      </div>
      {appointments.map((el) => (
        <dialog
          key={el.id}
          id={`updateAppointment-form${el.id}`}
          className="modal"
          onClose={hdlClose}
        >
          <div className="modal-box rounded-lg">
            <EditAppointmentPage resetForm={resetForm} el={el} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      ))}
      <dialog
        id={`createAppointment-form`}
        className="modal"
        onClose={hdlClose}
      >
        <div className="modal-box rounded-lg">
          <CreateAppointmentPage resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
      {/* <pre>{JSON.stringify(appointments, null, 2)}</pre> */}
    </div>
  );
}

export default AppointmentsListPage;
