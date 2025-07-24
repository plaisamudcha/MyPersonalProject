import defaultImage from "../assets/defaultImage.jpg";

function PrescriptionForm({ el }) {
  const prescriptions = el.medicalRecord?.prescriptions ?? [];
  return (
    <tr>
      <td className="text-center">
        {prescriptions.map((item) => (
          <div key={item.id}>{item.id}</div>
        ))}
      </td>
      <td className="text-center">
        <div className="avatar">
          <div className="w-15 rounded-full">
            <img
              src={el.medicalRecord?.patient?.profileImage || defaultImage}
              alt="profileImage"
            />
          </div>
        </div>
      </td>
      <td className="text-center">
        {el.medicalRecord?.patient?.firstName}{" "}
        {el.medicalRecord?.patient?.lastName}
      </td>
      <td className="text-center">
        {prescriptions.map((item, idx) => (
          <div key={idx}>{item.dosage}</div>
        ))}
      </td>
      <td className="text-center">
        {prescriptions.map((item, idx) => (
          <div key={idx}>{item.duration}</div>
        ))}
      </td>
      <td className="text-center">
        {prescriptions.map((item, idx) => (
          <div key={idx}>{item.medicine?.name ?? "-"}</div>
        ))}
      </td>
    </tr>
  );
}

export default PrescriptionForm;
