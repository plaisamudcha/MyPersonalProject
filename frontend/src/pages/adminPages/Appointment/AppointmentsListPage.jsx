import { useEffect, useState } from "react";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import AppointmentsForm from "../../../components/AppointmentsForm";
import EditAppointmentPage from "./EditAppointmentPage";
import CreateAppointmentPage from "./CreateAppointmentPage";
<<<<<<< HEAD
=======
import SearchTextForm from "../../../components/SearchForm";
import SearchSelectForm from "../../../components/SearchSelectForm";
import CreateButton from "../../../components/CreateButton";

const status = [
  { id: 0, value: "", name: "All" },
  { id: 1, value: "SCHEDULED", name: "Schedule" },
  { id: 2, value: "COMPLETED", name: "Complete" },
];
>>>>>>> c55d519 (second commit)

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
<<<<<<< HEAD
      <button
        className="absolute right-0 btn btn-active btn-lg"
        onClick={() => {
          document.getElementById("createAppointment-form").showModal();
        }}
      >
        Create new appointment
      </button>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <label className="font-bold">
          {" "}
          Search by doctor:
          <input
            value={doctorSearch}
            onChange={(e) => setDoctorSearch(e.target.value)}
            className="input input-accent mt-2"
            type="text"
            placeholder="Search"
          />
        </label>
        <label className="font-bold">
          {" "}
          Search by patient:
          <input
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            className="input input-accent mt-2"
            type="text"
            placeholder="Search"
          />
        </label>
        <label className="font-bold">
          {" "}
          Search by Status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-accent mt-2"
          >
            <option value="">All</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </label>
=======
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
>>>>>>> c55d519 (second commit)
      </div>
      <div className="w-full ">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>VN</th>
              <th>Doctor Id</th>
              <th>Doctor Name</th>
              <th>HN</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Edit appointment</th>
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
    </div>
  );
}

export default AppointmentsListPage;
