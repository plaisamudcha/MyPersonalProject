import { useForm } from "react-hook-form";
import authSchema from "../../validation/authValidate/authSchema";
import { useNavigate, useParams } from "react-router";
import useUserStore from "../../stores/useUserStore";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../components/InputForm";

function ResetPage() {
  const { token } = useParams();
  const navi = useNavigate();
  const resetPassword = useUserStore((state) => state.resetPassword);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(authSchema.resetPassword),
    shouldFocusError: true,
  });
  const onReset = async (data) => {
    try {
      const res = await resetPassword(data, token);
      reset();
      toast.success(res.data.message);
      navi("/login");
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <div className="h-9/10 flex items-center justify-center bg-gray-50 pb-5">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset your password
        </h2>

        <form onSubmit={handleSubmit(onReset)}>
          <fieldset className="space-y-4" disabled={isSubmitting}>
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
              label={"confirmPassword"}
              register={register("confirmPassword")}
              errors={errors}
            />

            <button type="submit" className="btn btn-accent w-full rounded-lg">
              {!isSubmitting && "Reset password"}
              {isSubmitting && (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Resetting...
                </>
              )}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ResetPage;
