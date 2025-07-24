import { useNavigate } from "react-router";
import useAppointmentStore from "../stores/useAppointmentStore";
import { toast } from "react-toastify";
import formatDate from "../utils/formatDate";

function AppointmentsForm({ el, setIsOpenEdit, page, limit }) {
  const navi = useNavigate();
  const updateStatusAppointment = useAppointmentStore(
    (state) => state.updateStatusAppointment
  );
  const hdlUpdate = async () => {
    try {
      const updateStatus = el.status === "SCHEDULED" ? "CANCELED" : "SCHEDULED";
      const data = { status: updateStatus };
      const res = await updateStatusAppointment(el.id, data, page, limit);
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      toast.error(errMsg);
    }
  };

  return (
    <tr>
      <td className="text-center">{el.id}</td>
      <td className="text-center">{el.doctor.id}</td>
      <td className="text-center">
        {el.doctor.firstName} {el.doctor.lastName}
      </td>
      <td className="text-center">{el.patient.id}</td>
      <td className="text-center">
        {el.patient.firstName} {el.patient.lastName}
      </td>
      <td className="text-center">{formatDate(el.date)}</td>
      <td className="text-center">{el.time}</td>
      <td className="text-center">
        {el.status === "COMPLETED" ? (
          <p className="badge badge-success">Completed</p>
        ) : (
          <p
            className={`badge ${
              el.status === "COMPLETED"
                ? "badge-success"
                : el.status === "SCHEDULED"
                ? "badge-warning"
                : "badge-error"
            } cursor-pointer`}
            onClick={hdlUpdate}
          >
            {el.status}
          </p>
        )}
      </td>
      <td className="text-center">
        <div className="flex gap-2 justify-center">
          <button
            className="btn btn-info "
            disabled={el.status === "COMPLETED" || el.status === "CANCELED"}
            onClick={() => setIsOpenEdit(el.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            disabled={el.status === "COMPLETED" || el.status === "CANCELED"}
            onClick={() => navi(`/admin/prescriptions/${el.id}`)}
          >
            See Prescription
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AppointmentsForm;
