import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import authSchema from "../../validation/authValidate/authSchema";
import useUserStore from "../../stores/useUserStore";
import { toast } from "react-toastify";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { useState } from "react";
import InputForm from "../../components/InputForm";
import ResetPasswordPage from "./ResetPasswordPage";

export default function LoginPage() {
  const [resetForm, setResetForm] = useState(false);
  const login = useUserStore((state) => state.login);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(authSchema.loginUser),
    shouldFocusError: true,
  });
  const onLogin = async (data) => {
    try {
      const res = await login(data);
      reset();
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  const hdlClose = () => {
    setResetForm((prv) => !prv);
  };
  return (
    <>
      <div className="h-9/10 flex items-center justify-center bg-gray-50 pb-5">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Hospital System
          </h2>

          <form onSubmit={handleSubmit(onLogin)}>
            <fieldset className="space-y-4" disabled={isSubmitting}>
              <InputForm
                name={"email"}
                label={"Email"}
                register={register("email")}
                errors={errors}
              />
              <InputForm
                type="password"
                name={"password"}
                label={"Password"}
                register={register("password")}
                errors={errors}
              />

              <button
                type="submit"
                className="btn btn-accent w-full rounded-lg"
              >
                {!isSubmitting && "Login"}
                {isSubmitting && (
                  <>
                    <span className="loading loading-spinner loading-md"></span>
                    Logining...
                  </>
                )}
              </button>

              <div className="text-center text-sm mt-4 text-gray-500">
                Forgot your password?{" "}
                <span
                  onClick={() =>
                    document.getElementById("forgot-form").showModal()
                  }
                  className="text-blue-600 hover:underline hover:cursor-pointer"
                >
                  Reset here
                </span>
              </div>

              <div className="text-center text-sm mt-2 text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register/patient"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <dialog id="forgot-form" className="modal" onClose={hdlClose}>
        <div className="modal-box rounded-lg">
          <ForgotPasswordPage resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
