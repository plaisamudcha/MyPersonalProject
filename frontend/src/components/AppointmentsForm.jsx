<<<<<<< HEAD
import React from "react";
=======
>>>>>>> c55d519 (second commit)
import useAppointmentStore from "../stores/useAppointmentStore";
import { toast } from "react-toastify";

function AppointmentsForm({ el }) {
  const updateStatusAppointment = useAppointmentStore(
    (state) => state.updateStatusAppointment
  );
  const deleteAppointment = useAppointmentStore(
    (state) => state.deleteAppointment
  );
  const hdlDelete = async () => {
    try {
<<<<<<< HEAD
=======
      const text = prompt(`text "delete" to delete appointment`);
      if (text !== "delete") return toast.info("Invalid text");
>>>>>>> c55d519 (second commit)
      const res = await deleteAppointment(el.id);
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(errMsg);
    }
  };
  const hdlUpdate = async () => {
    try {
      const updateStatus =
        el.status === "SCHEDULED" ? "COMPLETED" : "SCHEDULED";
      const data = { status: updateStatus };
      const res = await updateStatusAppointment(el.id, data);
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(errMsg);
    }
  };
<<<<<<< HEAD
=======
  const localDate = new Date(el.date).toLocaleString("en-EN", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  });

>>>>>>> c55d519 (second commit)
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.doctor.id}</td>
      <td>
        {el.doctor.firstName} {el.doctor.lastName}
      </td>
      <td>{el.patient.id}</td>
      <td>
        {el.patient.firstName} {el.patient.lastName}
      </td>
<<<<<<< HEAD
      <td>{el.date.split("T")[0]}</td>
=======
      <td>{localDate}</td>
>>>>>>> c55d519 (second commit)
      <td>{el.time}</td>
      <td
        className={`badge ${
          el.status === "COMPLETED" ? "badge-success" : "badge-warning"
        } mt-5 cursor-pointer`}
        onClick={hdlUpdate}
      >
        {el.status}
      </td>
      <td>
        <div className="flex gap-2">
          <button
            className="btn btn-info "
            onClick={() =>
              document
                .getElementById(`updateAppointment-form${el.id}`)
                .showModal()
            }
          >
            Edit
          </button>
          <button className="btn btn-neutral" onClick={hdlDelete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AppointmentsForm;
