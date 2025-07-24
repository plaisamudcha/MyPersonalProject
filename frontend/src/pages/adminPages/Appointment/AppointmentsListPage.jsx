import { useEffect, useState } from "react";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import AppointmentsForm from "../../../components/AppointmentsForm";
import EditAppointmentPage from "./EditAppointmentPage";
import CreateAppointmentPage from "./CreateAppointmentPage";
import SearchTextForm from "../../../components/SearchForm";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors, fetchPatients } from "../../../utils/query";
import CreateButton from "../../../components/CreateButton";
import PageButton from "../../../components/PageButton";

const time = [
  { id: 1, value: "08:00" },
  { id: 2, value: "08:30" },
  { id: 3, value: "09:00" },
  { id: 4, value: "09:30" },
  { id: 5, value: "10:00" },
  { id: 6, value: "10:30" },
  { id: 7, value: "11:30" },
  { id: 8, value: "12:00" },
  { id: 9, value: "12:30" },
  { id: 10, value: "13:00" },
  { id: 11, value: "13:30" },
  { id: 12, value: "14:00" },
  { id: 13, value: "14:30" },
  { id: 14, value: "15:00" },
  { id: 15, value: "15:30" },
  { id: 16, value: "16:00" },
];

function AppointmentsListPage() {
  const [resetForm, setResetForm] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalData = useAppointmentStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const appointments = useAppointmentStore((state) => state.appointments);
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );
  const { data: doctors = [] } = useQuery({
    queryKey: ["Doctors"],
    queryFn: () => fetchDoctors(""),
  });
  const { data: patients = [] } = useQuery({
    queryKey: ["Patients"],
    queryFn: () => fetchPatients(""),
  });
  const doctorArray = doctors.map((item, idx) => ({
    id: idx,
    value: item.id,
    name: item.user?.firstName + " " + item.user?.lastName,
  }));
  const patientArray = patients.map((item, idx) => ({
    id: idx,
    value: item.id,
    name: item.user?.firstName + " " + item.user?.lastName,
  }));
  useEffect(() => {
    getAllAppointments(page, limit, doctorName, patientName);
  }, [page, doctorName, patientName]);
  useEffect(() => {
    if (isOpenModal) {
      document.getElementById("createAppointment-form")?.showModal();
    }
    if (isOpenEdit) {
      document
        .getElementById(`updateAppointment-form${isOpenEdit}`)
        .showModal();
    }
  }, [isOpenModal, isOpenEdit]);
  const hdlClose = () => {
    setIsOpenEdit(null);
    setIsOpenModal(false);
    setResetForm((prv) => !prv);
  };
  return (
    <div className="relative flex flex-col gap-7 ">
      <h1 className="text-3xl font-bold text-center">
        List of all appointments : {totalData}
      </h1>
      <CreateButton head="Create new appointment" setModal={setIsOpenModal} />
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by doctor's name"
          search={doctorName}
          setSearch={setDoctorName}
        />
        <SearchTextForm
          head="Search by patient's name"
          search={patientName}
          setSearch={setPatientName}
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
            {appointments.length !== 0 ? (
              appointments.map((el) => (
                <AppointmentsForm
                  key={el.id}
                  el={el}
                  setIsOpenEdit={setIsOpenEdit}
                  page={page}
                  limit={limit}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-xl text-center text-gray-500">
                  Don't have information
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PageButton page={page} setPage={setPage} totalPage={totalPage} />
      {appointments.map((el) =>
        isOpenEdit === el.id ? (
          <dialog
            key={el.id}
            id={`updateAppointment-form${el.id}`}
            className="modal"
            onClose={hdlClose}
          >
            <div className="modal-box rounded-lg">
              <EditAppointmentPage
                resetForm={resetForm}
                el={el}
                page={page}
                limit={limit}
                doctorArray={doctorArray}
                patientArray={patientArray}
                time={time}
              />
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </dialog>
        ) : (
          ""
        )
      )}
      {isOpenModal && (
        <dialog
          id={`createAppointment-form`}
          className="modal"
          onClose={hdlClose}
        >
          <div className="modal-box rounded-lg">
            <CreateAppointmentPage
              resetForm={resetForm}
              page={page}
              limit={limit}
              doctorArray={doctorArray}
              patientArray={patientArray}
              time={time}
            />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default AppointmentsListPage;
