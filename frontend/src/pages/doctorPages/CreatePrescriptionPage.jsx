import { useEffect, useState } from "react";
import usePrescriptionStore from "../../stores/usePrescriptionStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import doctorSchema from "../../validation/adminValidate/doctorSchema";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function CreatePrescriptionPage({ id, resetForm }) {
  const navi = useNavigate();
  const [isAddPrescription, setIsAddprescription] = useState(false);
  const createPrescription = usePrescriptionStore(
    (state) => state.createPrescription
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
    resolver: yupResolver(doctorSchema.createPrescription),
    defaultValues: { medicalRecordId: id },
  });
  const onCreate = async (data) => {
    try {
      const newObj = {
        ...data,
        dosage: `${data.dosage} ${data.dosage < 2 ? "time" : "times"}/day`,
        duration: `${data.duration} ${data.duration < 2 ? "day" : "days"}`,
      };
      const res = await createPrescription(newObj);
      toast.success(res.data.message);
      reset({ ...data, dosage: "", duration: "", medicineId: "" });
      setIsAddprescription(true);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="flex-1 p-8">
      <div className="w-full max-w-lg bg-white p-5 rounded-xl shadow-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-3">
          Create Prescription
        </h2>
        <form onSubmit={handleSubmit(onCreate)}>
          <fieldset className="space-y-3" disabled={isSubmitting}>
            <InputForm
              type="number"
              name={"dosage"}
              label={"dosage"}
              register={register("dosage")}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"duration"}
              label={"duration"}
              register={register("duration")}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"medicalRecordId"}
              label={"medicalRecordId"}
              register={register("medicalRecordId")}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"medicineId"}
              label={"medicineId"}
              register={register("medicineId")}
              errors={errors}
            />
            {/* ปุ่มเพิ่มรายการยา */}
            <button type="submit" className="w-full btn btn-accent rounded-lg">
              {!isSubmitting ? (
                "Add Prescription"
              ) : (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Adding...
                </>
              )}
            </button>

            {/* ปุ่มจบการเพิ่ม และอัปเดต appointment */}
            {isAddPrescription && (
              <button
                type="button"
                className="btn btn-success w-full mt-3"
                onClick={async () => {
                  toast.success("Appointment completed");
                  document.getElementById("createPrescription-form")?.close();
                  navi("/doctor/prescriptions");
                }}
              >
                Finish and Complete Appointment
              </button>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default CreatePrescriptionPage;
