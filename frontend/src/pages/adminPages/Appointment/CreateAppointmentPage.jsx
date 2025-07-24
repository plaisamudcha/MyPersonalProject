import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import InputOptionForm from "../../../components/InputOptionForm";

function CreateAppointmentPage({
  resetForm,
  page,
  limit,
  doctorArray,
  patientArray,
  time,
}) {
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment
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
    resolver: yupResolver(adminSchema.createAppointment),
    shouldFocusError: true,
    defaultValues: { patientId: "", doctorId: "", time: "" },
  });
  const onUpdate = async (data) => {
    try {
      const res = await createAppointment(data, page, limit);
      document.getElementById(`createAppointment-form`).close();
      toast.success(res.data.message);
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
            Create Appointment
          </h2>

          <form onSubmit={handleSubmit(onUpdate)}>
            <fieldset className="space-y-3" disabled={isSubmitting}>
              <InputForm
                type="date"
                name={"date"}
                label={"Date"}
                register={register("date")}
                errors={errors}
              />
              <InputOptionForm
                label="Doctor ID : name"
                name="doctorId"
                register={register("doctorId")}
                array={doctorArray}
                errors={errors}
              />
              <InputOptionForm
                label="Patient ID : name"
                name="patientId"
                register={register("patientId")}
                array={patientArray}
                errors={errors}
              />
              <InputOptionForm
                label="Time appointment"
                name="time"
                register={register("time")}
                array={time}
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

export default CreateAppointmentPage;
