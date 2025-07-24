import { useEffect, useState } from "react";
import usePrescriptionStore from "../../stores/usePrescriptionStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import doctorSchema from "../../validation/adminValidate/doctorSchema";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useMedicineStore from "../../stores/useMedicineStore";
import InputOptionForm from "../../components/InputOptionForm";

function CreatePrescriptionPage({ el, resetForm }) {
  const navi = useNavigate();
  const [isAddPrescription, setIsAddprescription] = useState(false);
  const createPrescription = usePrescriptionStore(
    (state) => state.createPrescription
  );
  const medicines = useMedicineStore((state) => state.medicines);
  const getAllMedicines = useMedicineStore((state) => state.getAllMedicines);
  const medicinesArr = medicines.map((item) => ({
    id: item.id,
    value: item.id,
    name: item.name,
    stock: item.stock,
  }));
  useEffect(() => {
    getAllMedicines(1, 100, "", "");
  }, []);
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
    defaultValues: { medicalRecordId: el.id, medicineId: "" },
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
            <InputOptionForm
              label="Medicine ID"
              name="medicineId"
              register={register("medicineId")}
              array={medicinesArr}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"dosage"}
              label={"dosage (times/day)"}
              register={register("dosage")}
              errors={errors}
            />
            <InputForm
              type="number"
              name={"duration"}
              label={"duration (day)"}
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

            {isAddPrescription && (
              <button
                type="button"
                className="btn btn-success w-full mt-3"
                onClick={async () => {
                  toast.success("Appointment completed");
                  document
                    .getElementById(`createPrescription-form${el.id}`)
                    ?.close();
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
