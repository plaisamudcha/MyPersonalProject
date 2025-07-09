import { useEffect } from "react";
import useMedicalRecordStore from "../../stores/useMedicalRecordStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import doctorSchema from "../../validation/adminValidate/doctorSchema";
import { toast } from "react-toastify";
import InputForm from "../../components/InputForm";

function CreateMedicalRecordPage({ id, resetForm }) {
  const createMedicalRecord = useMedicalRecordStore(
    (state) => state.createMedicalRecord
  );
  useEffect(() => {
    reset();
  }, [resetForm]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(doctorSchema.createMedicalRecord),
    shouldFocusError: true,
    defaultValues: { appointmentId: id },
  });
  const onCreate = async (data) => {
    try {
      const res = await createMedicalRecord(data);
      document.getElementById("createMedicalRecord-form").close();
      document.getElementById("createPrescription-form").showModal();
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="flex-1 p-8">
      <div className="w-full max-w-lg bg-white p-5 rounded-xl shadow-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3">
          Create Medical Record
        </h2>

        <form onSubmit={handleSubmit(onCreate)}>
          <fieldset className="space-y-3" disabled={isSubmitting}>
            <InputForm
              name={"diagnosis"}
              label={"diagnosis"}
              register={register("diagnosis")}
              errors={errors}
            />
            <InputForm
              type="textarea"
              name={"notes"}
              label={"notes"}
              register={register("notes")}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"appointmentId"}
              label={"appointmentId"}
              register={register("appointmentId")}
              errors={errors}
            />
            <button type="submit" className="w-full btn btn-accent rounded-lg">
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
  );
}

export default CreateMedicalRecordPage;
