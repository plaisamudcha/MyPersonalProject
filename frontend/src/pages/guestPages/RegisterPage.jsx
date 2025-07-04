import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import authSchema from "../../validation/authValidate/authSchema";
import InputForm from "../../components/InputForm";
import { toast } from "react-toastify";
import authToBackend from "../../api/authApi";

export default function RegisterPatientPage() {
  const navi = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(authSchema.registerPatient),
    shouldFocusError: true,
    defaultValues: { gender: "" },
  });
  const onRegister = async (data) => {
    try {
      const res = await authToBackend.registerPatient(data);
      reset();
      navi("/login");
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="h-9/10 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-3">
          Register as a Patient
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
            <InputForm
              type="date"
              name={"dob"}
              label={"Date of Birth"}
              register={register("dob")}
              errors={errors}
            />
            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                className="w-full border px-3 py-2 rounded-md"
                {...register("gender")}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {errors.gender && (
                <p className="text-sm text-red-400">{errors.gender?.message}</p>
              )}
            </div>
            <InputForm
              name={"phone"}
              label={"Phone Number"}
              register={register("phone")}
              errors={errors}
              type="tel"
              placeholder="08x-xxxx-xxx"
            />

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

        <div className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
