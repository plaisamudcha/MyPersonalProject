import { useEffect, useState } from "react";
import useMedicalRecordStore from "../../stores/useMedicalRecordStore";
import { useNavigate, useParams } from "react-router";
import defaultImage from "../../assets/defaultImage.jpg";
import CreateMedicalRecordPage from "./CreateMedicalRecordPage";
import CreatePrescriptionPage from "./CreatePrescriptionPage";
import useAppointmentStore from "../../stores/useAppointmentStore";

function MedicalRecordsPage() {
  const navi = useNavigate();
  const { patientId, appointmentId } = useParams();
  const [resetForm, setResetForm] = useState(false);
  const [isOpenMedical, setIsOpenMedical] = useState(false);
  const [isOpenPrescript, setIsOpenPrescript] = useState(null);
  const appointmentById = useAppointmentStore((state) => state.appointmentById);
  const getAppointmentById = useAppointmentStore(
    (state) => state.getAppointmentById
  );
  const medicalRecordsByPatientId = useMedicalRecordStore(
    (state) => state.medicalRecordsByPatientId
  );
  const getMedicalRecordsByPatientId = useMedicalRecordStore(
    (state) => state.getMedicalRecordsByPatientId
  );

  useEffect(() => {
    getAppointmentById(appointmentId);
    getMedicalRecordsByPatientId(patientId);
  }, [patientId]);
  useEffect(() => {
    if (isOpenMedical) {
      document.getElementById("createMedicalRecord-form").showModal();
    }
    if (isOpenPrescript) {
      document
        .getElementById(`createPrescription-form${isOpenPrescript}`)
        .showModal();
    }
  }, [isOpenMedical, isOpenPrescript]);
  const hdlClose = () => {
    setIsOpenMedical(false);
    setIsOpenPrescript(null);
    setResetForm((prv) => !prv);
  };
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              medicalRecordsByPatientId.patient?.profileImage || defaultImage
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {medicalRecordsByPatientId.patient?.user.firstName}{" "}
              {medicalRecordsByPatientId.patient?.user.lastName}
            </h2>
            <p>Gender: {medicalRecordsByPatientId.patient?.gender}</p>
            <p>
              Date of birth:{" "}
              {formatDate(medicalRecordsByPatientId.patient?.dob)}
            </p>
            <p>Phone: {medicalRecordsByPatientId.patient?.phone}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Medical Record</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border-b w-30">Medical record ID</th>
                <th className="p-3 border-b w-30">Date</th>
                <th className="p-3 border-b">Diagnosis</th>
                <th className="p-3 border-b">Notes</th>
                <th className="p-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {medicalRecordsByPatientId?.medicalRecord?.length > 0 ? (
                medicalRecordsByPatientId.medicalRecord.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3 border-b w-50">{item.id}</td>
                    <td className="p-3 border-b">
                      {formatDate(item?.createdAt)}
                    </td>
                    <td className="p-3 border-b">{item.diagnosis}</td>
                    <td className="p-3 border-b">{item.notes}</td>
                    <td className="p-3 border-b w-50">
                      {item.prescription?.length !== 0 ? (
                        <div className="badge badge-success">
                          Already has prescription{" "}
                        </div>
                      ) : (
                        <button
                          className="btn btn-accent"
                          onClick={() => setIsOpenPrescript(item.id)}
                        >
                          Add Prescription
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No medical records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-10 flex justify-between mx-auto w-1/2">
        <button
          className="btn btn-secondary btn-lg"
          onClick={() => navi("/doctor/appointments")}
        >
          Back to Appointment page
        </button>
        <button
          disabled={appointmentById.medicalRecord}
          className="btn btn-secondary btn-lg"
          onClick={() => setIsOpenMedical(true)}
        >
          Create new medical Record
        </button>
      </div>
      {medicalRecordsByPatientId.medicalRecord?.map((el, idx) =>
        isOpenPrescript === el.id ? (
          <dialog
            key={idx}
            id={`createPrescription-form${el.id}`}
            className="modal"
            onClose={hdlClose}
          >
            <div className="modal-box rounded-lg">
              <CreatePrescriptionPage resetForm={resetForm} el={el} />
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  X
                </button>
              </form>
            </div>
          </dialog>
        ) : (
          ""
        )
      )}
      {isOpenMedical && (
        <dialog
          id="createMedicalRecord-form"
          className="modal"
          onClose={hdlClose}
        >
          <div className="modal-box rounded-lg">
            <CreateMedicalRecordPage resetForm={resetForm} id={appointmentId} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                X
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MedicalRecordsPage;
