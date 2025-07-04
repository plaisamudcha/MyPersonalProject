import defaultImage from "../assets/defaultImage.jpg";

function AppointmentsDoctorForm({ el }) {
  const localDate = new Date(el.date).toLocaleString("en-EN", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  });
  return (
    <tr>
      <td className="flex">
        <div className="avatar">
          <div className="w-15 rounded-full">
            <img
              src={el.patient?.profileImage || defaultImage}
              alt="profileImage"
            />
          </div>
        </div>
      </td>
      <td>
        {el.patient?.user?.firstName} {el.patient?.user?.lastName}
      </td>
      <td>{localDate}</td>
      <td>{el.time}</td>
      <td
        className={`badge absolute mt-7 ${
          el.status === "COMPLETED" ? "badge-success" : "badge-warning"
        }`}
      >
        {el.status}
      </td>
    </tr>
  );
}

export default AppointmentsDoctorForm;
