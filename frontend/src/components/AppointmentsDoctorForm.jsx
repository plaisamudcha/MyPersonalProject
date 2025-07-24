import { useNavigate } from "react-router";
import defaultImage from "../assets/defaultImage.jpg";
import formatDate from "../utils/formatDate";

function AppointmentsDoctorForm({ el }) {
  const navi = useNavigate();
  const hdlClick = () => {
    navi(`/doctor/medical-records/${el.patientId}/${el.id}`);
  };
  return (
    <tr>
      <td className="text-center">{el.id}</td>
      <td className="flex justify-center">
        <div className="avatar">
          <div className="w-15 rounded-full">
            <img
              src={el.patient?.profileImage || defaultImage}
              alt="profileImage"
            />
          </div>
        </div>
      </td>
      <td className="text-center">
        {el.patient?.user?.firstName} {el.patient?.user?.lastName}
      </td>
      <td className="text-center">{formatDate(el.date)}</td>
      <td className="text-center">{el.time}</td>
      <td
        className={`badge absolute mt-7 mx-9 ${
          el.status === "COMPLETED" ? "badge-success" : "badge-warning"
        }`}
      >
        {el.status}
      </td>
      <td className="space-x-3 text-center w-80">
        <button
          className="btn btn-dash"
          onClick={hdlClick}
          disabled={el.status === "COMPLETED"}
        >
          Get medical's history
        </button>
      </td>
    </tr>
  );
}

export default AppointmentsDoctorForm;
