import defaultImage from "../assets/defaultImage.jpg";

function MedicalDoctorForm({ el }) {
  const localDate = new Date(el.medicalRecord?.createdAt).toLocaleString(
    "en-EN",
    {
      dateStyle: "long",
      timeZone: "Asia/Bangkok",
    }
  );
  return (
    <tr>
      <td className="text-center">{el.medicalRecord?.id}</td>
      <td className="flex justify-center">
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
        {localDate === "Invalid Date" ? "-" : localDate}
      </td>
      <td className="text-left w-100">{el.medicalRecord?.diagnosis}</td>
      <td className="text-c w-left w-100">{el.medicalRecord?.notes}</td>
    </tr>
  );
}
export default MedicalDoctorForm;
