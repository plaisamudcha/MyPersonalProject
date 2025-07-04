import React, { useEffect } from "react";
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authSchema from "../../validation/authValidate/authSchema";
import useUserStore from "../../stores/useUserStore";
import { toast } from "react-toastify";

function ResetPasswordPage({ resetForm }) {
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
  useEffect(() => {
    reset();
  }, [resetForm]);
  const onReset = async (data) => {
    try {
      console.log(data);
      const res = await resetPassword(data);
      toast.success(res.data.message);
      document.getElementById("reset-form").close();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
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
          label={"Confirm Password"}
          register={register("confirmPassword")}
          errors={errors}
        />
        <button type="submit" className="w-full btn btn-accent rounded-lg">
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
  );
}

export default ResetPasswordPage;
