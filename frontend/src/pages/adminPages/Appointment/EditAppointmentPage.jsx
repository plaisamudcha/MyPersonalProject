import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import formatDate from "../../../utils/formatDate";
import InputOptionForm from "../../../components/InputOptionForm";

function EditAppointmentPage({
  resetForm,
  el,
  page,
  limit,
  doctorArray,
  patientArray,
  time,
}) {
  const updateAppointment = useAppointmentStore(
    (state) => state.updateAppointment
  );
  const initialData = {
    date: formatDate(el.date),
    time: el.time,
    doctorId: el.doctor.id,
    patientId: el.patient.id,
  };
  useEffect(() => {
    reset(initialData);
  }, [resetForm]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createAppointment),
    shouldFocusError: true,
    defaultValues: initialData,
  });
  const onUpdate = async (data) => {
    try {
      const res = await updateAppointment(el.id, data, page, limit);
      document.getElementById(`updateAppointment-form${el.id}`).close();
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
            Update Appointment {el.id}
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
                {!isSubmitting && "Update"}
                {isSubmitting && (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Updating...
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

export default EditAppointmentPage;
