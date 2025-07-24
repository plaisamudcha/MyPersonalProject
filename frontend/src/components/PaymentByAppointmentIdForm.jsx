import React, { useEffect } from "react";
import usePaymentStore from "../stores/usePaymentStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import adminSchema from "../validation/adminValidate/adminSchema";
import usePrescriptionStore from "../stores/usePrescriptionStore";
import InputForm from "./InputForm";
import { toast } from "react-toastify";

const method = [
  { id: 1, value: "CASH" },
  { id: 2, value: "CREDITCARD" },
  { id: 3, value: "MOBILEBANKING" },
  { id: 4, value: "PROMPTPAY" },
];

function PaymentByAppointmentIdForm({ resetForm }) {
  const prescriptions = usePrescriptionStore((state) => state.prescriptions);
  const createPaymentByAppointmendId = usePaymentStore(
    (state) => state.createPaymentByAppointmendId
  );
  const amount = prescriptions?.medicalRecord?.prescription
    ?.reduce((sum, item) => {
      const dosage = Number(item.dosage.split(" ")[0]) || 0;
      const duration = Number(item.duration.split(" ")[0]) || 0;
      const price = item.medicine?.pricePerUnit || 0;
      return sum + dosage * duration * price;
    }, 0)
    .toFixed(2);
  useEffect(() => {
    reset({
      amount: amount,
      patientId: prescriptions.patientId,
      appointmentId: prescriptions.id,
      paymentMethod: "",
    });
  }, [prescriptions, resetForm]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createPayment),
    shouldFocusError: true,
    defaultValues: {
      amount: amount,
      patientId: prescriptions.patientId,
      appointmentId: prescriptions.id,
      paymentMethod: "",
    },
  });
  const onCreate = async (data) => {
    try {
      const res = await createPaymentByAppointmendId(data, 1, 100);
      document.getElementById(`payment-form`).close();
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <>
      <div className="flex-1 p-8">
        <div className="w-full max-w-lg bg-white p-5 rounded-xl shadow-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-3">
            Create Payment
          </h2>
          <form onSubmit={handleSubmit(onCreate)}>
            <fieldset className="space-y-3" disabled={isSubmitting}>
              <InputForm
                type="number"
                name={"amount"}
                label={"amount"}
                register={register("amount")}
                errors={errors}
              />
              <InputForm
                type="number"
                name={"patientId"}
                label={"patientId"}
                register={register("patientId")}
                errors={errors}
              />
              <InputForm
                type="number"
                name={"appointmentId"}
                label={"appointmentId"}
                register={register("appointmentId")}
                errors={errors}
              />
              <div>
                <label className="block mb-1 font-medium">Payment method</label>
                <select
                  className="w-full border px-3 py-2 rounded-md input input-accent"
                  {...register("paymentMethod")}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {method.map((el) => (
                    <option key={el.id} value={el.value}>
                      {el.value.slice(0, 1).toUpperCase() +
                        el.value.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod && (
                  <p className="text-sm text-red-400">
                    {errors.paymentMethod?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full btn btn-accent rounded-lg"
              >
                {!isSubmitting && "Create"}
                {isSubmitting && (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Creating...
                  </>
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaymentByAppointmentIdForm;
