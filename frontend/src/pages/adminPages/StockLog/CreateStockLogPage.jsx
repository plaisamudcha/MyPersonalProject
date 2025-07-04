import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useStockLogStore from "../../../stores/useStockLogStore";

function CreateStockLogPage({ resetForm }) {
  const createStockLog = useStockLogStore((state) => state.createStockLog);
  useEffect(() => {
    reset();
  }, [resetForm]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createStock),
    shouldFocusError: true,
  });
  const onUpdate = async (data) => {
    try {
      const res = await createStockLog(data);
      document.getElementById(`createStockLog-form`).close();
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
            Create stocklog
          </h2>

          <form onSubmit={handleSubmit(onUpdate)}>
            <fieldset className="space-y-3" disabled={isSubmitting}>
              <InputForm
                type="number"
                name={"change"}
                label={"change"}
                register={register("change")}
                errors={errors}
              />
              <InputForm
                name={"reason"}
                label={"reason"}
                register={register("reason")}
                errors={errors}
              />
              <InputForm
                type="number"
                name={"medicineId"}
                label={"medicineId"}
                register={register("medicineId")}
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

export default CreateStockLogPage;
