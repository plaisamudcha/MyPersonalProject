import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import useDoctorStore from "../../../stores/useDoctorStore";
import usePatientStore from "../../../stores/usePatientStore";

const time = [
  { id: 1, value: "08:00" },
  { id: 2, value: "08:30" },
  { id: 3, value: "09:00" },
  { id: 4, value: "09:30" },
  { id: 5, value: "10:00" },
  { id: 6, value: "10:30" },
  { id: 7, value: "11:30" },
  { id: 8, value: "12:00" },
  { id: 9, value: "12:30" },
  { id: 10, value: "13:00" },
  { id: 11, value: "13:30" },
  { id: 12, value: "14:00" },
  { id: 13, value: "14:30" },
  { id: 14, value: "15:00" },
  { id: 15, value: "15:30" },
  { id: 16, value: "16:00" },
];

function CreateAppointmentPage({ resetForm }) {
  const doctors = useDoctorStore((state) => state.doctors);
  const getAllDoctors = useDoctorStore((state) => state.getAllDoctors);
  const patients = usePatientStore((state) => state.patients);
  const getAllPatients = usePatientStore((state) => state.getAllPatients);
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment
  );
  useEffect(() => {
    reset();
  }, [resetForm]);
  useEffect(() => {
    getAllDoctors();
    getAllPatients();
  }, []);

  const doctorArray = doctors.map((item, idx) => ({
    id: idx,
    value: item.id,
    name: item.user?.firstName + " " + item.user?.lastName,
  }));

  const patientArray = patients.map((item, idx) => ({
    id: idx,
    value: item.id,
    name: item.user?.firstName + " " + item.user?.lastName,
  }));

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createAppointment),
    shouldFocusError: true,
    defaultValues: { time: "" },
  });
  const onUpdate = async (data) => {
    try {
      const res = await createAppointment(data);
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
                label={"date"}
                register={register("date")}
                errors={errors}
              />
              <div className="flex-1">
                <label className="font-bold">
                  {" "}
                  DoctorId
                  <select
                    {...register("doctorId")}
                    className="select select-accent mt-2"
                  >
                    {doctorArray.map((el) => (
                      <option key={el.id} value={el.value}>
                        {`${el.value} : ${el.name}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="flex-1">
                <label className="font-bold">
                  {" "}
                  PatientId
                  <select
                    {...register("patientId")}
                    className="select select-accent mt-2"
                  >
                    {patientArray.map((el) => (
                      <option key={el.id} value={el.value}>
                        {`${el.value} : ${el.name}`}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Time appointment
                </label>
                <select
                  className="w-full border px-3 py-2 rounded-md input input-accent"
                  {...register("time")}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {time.map((el) => (
                    <option key={el.id} value={el.value}>
                      {el.value}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-sm text-red-400">{errors.time?.message}</p>
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

export default CreateAppointmentPage;
