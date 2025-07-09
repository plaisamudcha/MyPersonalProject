import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import authSchema from "../../validation/authValidate/authSchema";
import { toast } from "react-toastify";
import useUserStore from "../../stores/useUserStore";
import InputForm from "../../components/InputForm";

function ForgotPasswordPage({ resetForm }) {
  const forgotPassword = useUserStore((state) => state.forgotPassword);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(authSchema.forgotPassword),
    shouldFocusError: true,
  });
  useEffect(() => {
    reset();
  }, [resetForm]);
  const onForgot = async (data) => {
    try {
      const res = await forgotPassword(data);
      toast.success(res.data.message);
      document.getElementById("forgot-form").close();
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };
  return (
    <form onSubmit={handleSubmit(onForgot)}>
      <fieldset className="space-y-4" disabled={isSubmitting}>
        <InputForm
          name={"email"}
          label={"Email"}
          register={register("email")}
          errors={errors}
        />
        <button type="submit" className="w-full btn btn-accent rounded-lg">
          {!isSubmitting && "Reset password"}
          {isSubmitting && (
            <>
              <span className="loading loading-spinner loading-md"></span>
              Going to reset...
            </>
          )}
        </button>
      </fieldset>
    </form>
  );
}

export default ForgotPasswordPage;
