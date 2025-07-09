import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useStockLogStore from "../../../stores/useStockLogStore";
import usePrescriptionStore from "../../../stores/usePrescriptionStore";

function CreateStockLogPage({ appointmentId, item }) {
  const createStockLog = useStockLogStore((state) => state.createStockLog);
  const updatePrescriptionById = usePrescriptionStore(
    (state) => state.updatePrescriptionById
  );
  useEffect(() => {
    reset({
      change:
        Number(item.dosage.split(" ")[0]) *
        Number(item.duration.split(" ")[0]) *
        -1,
      reason: `medicine from appointment ID ${item.medicalRecordId}`,
      medicineId: item.medicineId,
    });
  }, []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createStock),
    shouldFocusError: true,
    defaultValues: {
      change:
        Number(item.dosage.split(" ")[0]) *
        Number(item.duration.split(" ")[0]) *
        -1,
      reason: `medicine from appointment ID ${item.medicalRecordId}`,
      medicineId: item.medicineId,
    },
  });
  const onUpdate = async (data) => {
    try {
      const res = await createStockLog(data);
      const res2 = await updatePrescriptionById(item.id, { createStock: true });
      document.getElementById(`createStockLog-form${item.id}`).close();
      toast.success(res.data.message);
      toast.success(res2.data.message);
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
            Create stocklog ID : {item.id}
          </h2>

          <form onSubmit={handleSubmit(onUpdate)}>
            <fieldset className="space-y-3" disabled={isSubmitting}>
              <InputForm
                type="number"
                name={"change"}
                label={"change"}
                register={register("change")}
                errors={errors}
              />
              <InputForm
                name={"reason"}
                label={"reason"}
                register={register("reason")}
                errors={errors}
              />
              <InputForm
                type="number"
                name={"medicineId"}
                label={"medicineId"}
                register={register("medicineId")}
                errors={errors}
              />
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

export default CreateStockLogPage;
