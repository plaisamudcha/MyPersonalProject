import { useNavigate, useParams } from "react-router";
import usePaymentStore from "../../../stores/usePaymentStore";
import { useEffect } from "react";
import defaultImage from "../../../assets/defaultImage.jpg";
import { toast } from "react-toastify";

function PaymentByAppointmentIdPage() {
  const { appointmentId } = useParams();
  const navi = useNavigate();
  const paymentByAppointmentId = usePaymentStore(
    (state) => state.paymentByAppointmentId
  );
  const getPaymentByAppointmentId = usePaymentStore(
    (state) => state.getPaymentByAppointmentId
  );
  const updatePaymentStatus = usePaymentStore(
    (state) => state.updatePaymentStatus
  );
  useEffect(() => {
    getPaymentByAppointmentId(appointmentId);
  }, []);
  const hdlUpdate = async () => {
    try {
      const data = { status: "PAID" };
      const res = await updatePaymentStatus(
        paymentByAppointmentId.payment?.id,
        data
      );
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  if (paymentByAppointmentId.payment?.paymentMethod === "CREDITCARD")
    return (
      <div>
        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Payment Details
          </h2>
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block font-semibold mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                className="input input-bordered w-full"
              />
            </div>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block font-semibold mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="input input-bordered w-full"
              />
            </div>

            {/* Expiry and CVC */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiry" className="block font-semibold mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvc" className="block font-semibold mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  placeholder="123"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-accent w-full text-lg font-semibold"
            >
              Pay Now
            </button>
          </form>
        </div>
        <pre>{JSON.stringify(paymentByAppointmentId, null, 2)}</pre>
      </div>
    );
  else {
    return (
      <div>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-center mb-6">Payment</h1>
          <form className="space-y-4">
            <div className="avatar ms-35">
              <div className="w-25 rounded-full">
                <img
                  src={
                    paymentByAppointmentId.patient?.profileImage || defaultImage
                  }
                  alt="profileImage"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Patient :</p>
              <p>
                {paymentByAppointmentId.patient?.user?.firstName}{" "}
                {paymentByAppointmentId.patient?.user?.lastName}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Appointment ID :</p>
              <p>{paymentByAppointmentId.id}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Amount :</p>
              <p> ${paymentByAppointmentId.payment?.amount}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Payment Method :</p>
              <p> {paymentByAppointmentId.payment?.paymentMethod}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Status :</p>
              <p
                className={`badge ${
                  paymentByAppointmentId.payment?.status === "PENDING"
                    ? "badge-info"
                    : "badge-success"
                }`}
              >
                {" "}
                {paymentByAppointmentId.payment?.status}
              </p>
            </div>
            {paymentByAppointmentId.payment?.status === "PAID" ? (
              <button
                className="btn btn-primary w-full mt-4"
                onClick={() =>
                  navi(`/admin/prescriptions/${paymentByAppointmentId.id}`)
                }
              >
                Go to Create Stock-log
              </button>
            ) : (
              <button
                className="btn btn-primary w-full mt-4"
                onClick={hdlUpdate}
              >
                Submit Payment
              </button>
            )}
          </form>
        </div>
        {/* <pre>{JSON.stringify(paymentByAppointmentId, null, 2)}</pre> */}
      </div>
    );
  }
}

export default PaymentByAppointmentIdPage;
