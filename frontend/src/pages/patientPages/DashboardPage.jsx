import { useEffect } from "react";
import useUserStore from "../../stores/useUserStore";
import useAppointmentStore from "../../stores/useAppointmentStore";
import usePaymentStore from "../../stores/usePaymentStore";
import defaultImage from "../../assets/defaultImage.jpg";

function DashboardPage() {
  const user = useUserStore((state) => state.user);
  const appointmentsByPatientId = useAppointmentStore(
    (state) => state.appointmentsByPatientId
  );
  const getAppointmentsByPatientId = useAppointmentStore(
    (state) => state.getAppointmentsByPatientId
  );

  const paymentByPatientId = usePaymentStore(
    (state) => state.paymentByPatientId
  );
  const getPaymentByPatientId = usePaymentStore(
    (state) => state.getPaymentByPatientId
  );

  useEffect(() => {
    getAppointmentsByPatientId();
    getPaymentByPatientId();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center gap-6">
          <img
            src={user?.patient?.profileImage || defaultImage}
            className="w-28 h-28 rounded-full border object-cover"
            alt="profile"
          />
          <div>
            <h2 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600">Gender: {user?.patient?.gender}</p>
            <p className="text-gray-600">
              DOB: {new Date(user?.patient?.dob).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Phone: {user?.patient?.phone}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          {appointmentsByPatientId.appointments ? (
            <ul className="space-y-3">
              {appointmentsByPatientId.appointments.map((item) => (
                <li
                  key={item.id}
                  className="border rounded p-3 hover:bg-gray-50 transition"
                >
                  <p className="font-medium">
                    {new Date(item.date).toLocaleDateString()} at {item.time}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-semibold text-blue-600">
                      {item.status}
                    </span>
                  </p>
                  <p className="text-sm">
                    Doctor: {item.doctor?.user?.firstName}{" "}
                    {item.doctor?.user?.lastName}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No upcoming appointments</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold mb-4">Payment History</h3>
          {paymentByPatientId.payment === 0 ? (
            <ul className="space-y-3">
              {paymentByPatientId.payment.map((item) => (
                <li
                  key={item.id}
                  className="border rounded p-3 hover:bg-gray-50 transition"
                >
                  <p className="font-medium">
                    {new Date(item.paidAt).toLocaleDateString() || "PENDING"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="text-green-600 font-semibold">
                      ${item.amount}
                    </span>
                  </p>
                  <p className="text-sm">Method: {item.paymentMethod}</p>
                  <p
                    className={`text-sm font-medium ${
                      item.status === "PAID"
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.status}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No payments found</p>
          )}
        </div>
      </div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(appointmentsByPatientId, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(paymentByPatientId, null, 2)}</pre> */}
    </div>
  );
}

export default DashboardPage;
