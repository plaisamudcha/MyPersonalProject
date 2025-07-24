import defaultImage from "../assets/defaultImage.jpg";
import formatDate from "../utils/formatDate";

function MedicalDoctorForm({ el }) {
  return (
    <tr>
      <td className="text-center">{el.id}</td>
      <td className="flex justify-center">
        <div className="avatar">
          <div className="w-15 rounded-full">
            <img
              src={el.appointment.patient?.profileImage || defaultImage}
              alt="profileImage"
            />
          </div>
        </div>
      </td>
      <td className="text-center">
        {el.appointment.patient?.user?.firstName}{" "}
        {el.appointment.patient?.user?.lastName}
      </td>
      <td className="text-center">{formatDate(el.createdAt)}</td>
      <td className="text-left w-100">{el.diagnosis}</td>
      <td className="text-c w-left w-100">{el.notes}</td>
    </tr>
  );
}
export default MedicalDoctorForm;
