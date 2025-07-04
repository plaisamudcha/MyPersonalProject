import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authToBackend from "../../../api/authApi";
import useUserStore from "../../../stores/useUserStore";
import authSchema from "../../../validation/authValidate/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";

const specialization = [
  { id: 1, value: "GENERAL_PRACTICE" },
  { id: 2, value: "INTERNAL_MEDICINE" },
  { id: 3, value: "PEDIATRICS" },
  { id: 4, value: "OBSTETRICS_GYNECOLOGY" },
  { id: 5, value: "SURGERY" },
  { id: 6, value: "ORTHOPEDIC" },
  { id: 7, value: "CARDIOLOGY" },
  { id: 8, value: "NEUROLOGY" },
  { id: 9, value: "DERMATOLOGY" },
  { id: 10, value: "OPHTHALMOLOGY" },
  { id: 11, value: "PSYCHIATRY" },
  { id: 12, value: "ENT" },
  { id: 13, value: "ANESTHESIOLOGY" },
  { id: 14, value: "EMERGENCY_MEDICINE" },
  { id: 15, value: "RADIOLOGY" },
  { id: 16, value: "ONCOLOGY" },
  { id: 17, value: "UROLOGY" },
];

function RegisterDoctorPage() {
  const navi = useNavigate();
  const token = useUserStore((state) => state.accessToken);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(authSchema.registerDoctor),
    shouldFocusError: true,
    defaultValues: { specialization: "" },
  });
  const onRegister = async (data) => {
    try {
      await new Promise((rs) => setTimeout(rs, 2000));
      console.log("data", data);
      const res = await authToBackend.registerDoctor(data, token);
      reset();
      navi("/");
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
          Register as a Doctor
        </h2>

        <form onSubmit={handleSubmit(onRegister)}>
          <fieldset className="space-y-3" disabled={isSubmitting}>
            <div className="flex gap-4">
              <InputForm
                name={"firstName"}
                label={"First Name"}
                register={register("firstName")}
                errors={errors}
              />
              <InputForm
                name={"lastName"}
                label={"last Name"}
                register={register("lastName")}
                errors={errors}
              />
            </div>
            <InputForm
              name={"email"}
              label={"Email"}
              register={register("email")}
              errors={errors}
            />
            <div className="md:col-span-2 flex gap-4">
              <InputForm
                type="password"
                name={"password"}
                label={"Password"}
                register={register("password")}
                errors={errors}
              />
              <InputForm
                type="password"
                name={"confirmPassword"}
                label={"Confirm Password"}
                register={register("confirmPassword")}
                errors={errors}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Specialization</label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                {...register("specialization")}
              >
                <option value="" disabled>
                  Select
                </option>
                {specialization.map((el) => (
                  <option key={el.id} value={el.value}>
                    {el.value.slice(0, 1).toUpperCase() +
                      el.value.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors.specialization && (
                <p className="text-sm text-red-400">
                  {errors.specialization?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit"
                className="w-full btn btn-accent rounded-lg"
              >
                {!isSubmitting && "Register"}
                {isSubmitting && (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Registering...
                  </>
                )}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default RegisterDoctorPage;
