import { useEffect, useState } from "react";
import usePrescriptionStore from "../../../stores/usePrescriptionStore";
import { useNavigate, useParams } from "react-router";
import defaultImage from "../../../assets/defaultImage.jpg";
import PaymentByAppointmentIdForm from "../../../components/PaymentByAppointmentIdForm";
import CreateStockLogPage from "../StockLog/CreateStockLogPage";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import { toast } from "react-toastify";
import formatDate from "../../../utils/formatDate";

function PrescriptionListPage() {
  const [resetForm, setResetForm] = useState(false);
  const navi = useNavigate();
  const { appointmentId } = useParams();
  const prescriptions = usePrescriptionStore((state) => state.prescriptions);
  const getAllPrescriptionsByAdmin = usePrescriptionStore(
    (state) => state.getAllPrescriptionsByAdmin
  );
  const updateStatusAppointment = useAppointmentStore(
    (state) => state.updateStatusAppointment
  );

  useEffect(() => {
    getAllPrescriptionsByAdmin(appointmentId);
  }, []);
  const hdlClose = () => {
    setResetForm((prv) => !prv);
  };
  const hdlAddPayment = () => {
    document.getElementById("payment-form").showModal();
  };
  const hdlStatusAppointment = async () => {
    try {
      const res = await updateStatusAppointment(prescriptions.id, {
        status: "COMPLETED",
      });
      toast.success(res.data.message);
      navi("/admin/appointments");
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={prescriptions.patient?.profileImage || defaultImage}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {prescriptions.patient?.user?.firstName}{" "}
              {prescriptions.patient?.user?.lastName}
            </h2>
            <p>Gender: {prescriptions.patient?.gender}</p>
            <p>Date of birth: {formatDate(prescriptions.patient?.dob)}</p>
            <p>Phone: {prescriptions.patient?.phone}</p>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">Prescription</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 border-b text-center">Prescription ID</th>
                <th className="p-3 border-b text-center">Dosage</th>
                <th className="p-3 border-b text-center">Duration</th>
                <th className="p-3 border-b text-center">Medicine name</th>
                <th className="p-3 border-b text-center">Medicine price</th>
                <th className="p-3 border-b text-center">Stock log</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.medicalRecord?.prescription?.length > 0 ? (
                prescriptions.medicalRecord?.prescription?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3 border-b text-center">{item.id}</td>
                    <td className="p-3 border-b text-center">{item.dosage}</td>
                    <td className="p-3 border-b text-center">
                      {item.duration}
                    </td>
                    <td className="p-3 border-b text-center">
                      {item.medicine?.name}
                    </td>
                    <td className="p-3 border-b text-center">
                      ${item.medicine?.pricePerUnit}
                    </td>
                    {prescriptions.payment && prescriptions.payment.paidAt ? (
                      <td className="text-center">
                        {" "}
                        {!item.createStock ? (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              document
                                .getElementById(`createStockLog-form${item.id}`)
                                .showModal()
                            }
                          >
                            Create stock-log
                          </button>
                        ) : (
                          <p className="badge badge-success">
                            Already Stock-log
                          </p>
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    No medical records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 text-center space-x-4">
          {prescriptions.payment !== null ? (
            <button
              className="btn btn-primary"
              onClick={() => navi(`/admin/payments/${prescriptions.id}`)}
            >
              Go to Payment
            </button>
          ) : (
            <button
              className="btn btn-accent"
              onClick={hdlAddPayment}
              disabled={prescriptions.medicalRecord?.prescription.length === 0}
            >
              Add Payment
            </button>
          )}
          {prescriptions.medicalRecord?.prescription.findIndex(
            (item) => item.createStock === false
          ) === -1 && prescriptions.medicalRecord?.prescription.length !== 0 ? (
            <button className="btn btn-info" onClick={hdlStatusAppointment}>
              Completed Appointment
            </button>
          ) : (
            " "
          )}
          <button
            className="btn btn-primary"
            onClick={() => navi("/admin/appointments")}
          >
            Go to Appointment
          </button>
        </div>
      </div>
      <dialog id={`payment-form`} className="modal" onClose={hdlClose}>
        <div className="modal-box rounded-lg">
          <PaymentByAppointmentIdForm resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
      {prescriptions.medicalRecord?.prescription?.map((item, idx) => (
        <dialog
          key={idx}
          id={`createStockLog-form${item.id}`}
          onClose={hdlClose}
          className="modal"
        >
          <div className="modal-box rounded-lg">
            <CreateStockLogPage
              appointmentId={appointmentId}
              item={item}
              resetForm={resetForm}
            />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      ))}
      {/* <pre>{JSON.stringify(prescriptions, null, 2)}</pre> */}
    </div>
  );
}

export default PrescriptionListPage;
