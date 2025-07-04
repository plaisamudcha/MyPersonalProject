import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import useMedicineStore from "../../../stores/useMedicineStore";

const forms = [
  { id: 1, value: "TABLET" },
  { id: 2, value: "SYRUP" },
  { id: 3, value: "CAPSULE" },
  { id: 4, value: "INJECTION" },
  { id: 5, value: "CREAM" },
];

function CreateMedicinePage({ resetForm }) {
  const createMedicine = useMedicineStore((state) => state.createMedicine);
  useEffect(() => {
    reset();
  }, [resetForm]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(adminSchema.createMedicine),
    shouldFocusError: true,
<<<<<<< HEAD
=======
    defaultValues: { form: "" },
>>>>>>> c55d519 (second commit)
  });
  const onUpdate = async (data) => {
    try {
      const res = await createMedicine(data);
      document.getElementById(`createMedicine-form`).close();
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
            Create medicine
          </h2>

          <form onSubmit={handleSubmit(onUpdate)}>
            <fieldset className="space-y-3" disabled={isSubmitting}>
              <InputForm
                name={"name"}
                label={"name"}
                register={register("name")}
                errors={errors}
              />
              <InputForm
                name={"description"}
                label={"description"}
                register={register("description")}
                errors={errors}
              />
              <InputForm
                name={"pricePerUnit"}
                label={"pricePerUnit"}
                register={register("pricePerUnit")}
                errors={errors}
              />
              <div>
                <label className="block mb-1 font-medium">Medicine form</label>
                <select
                  className="w-full border px-3 py-2 rounded-md input input-accent"
                  {...register("form")}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {forms.map((el) => (
                    <option key={el.id} value={el.value}>
                      {el.value}
                    </option>
                  ))}
                </select>
                {errors.form && (
                  <p className="text-sm text-red-400">{errors.form?.message}</p>
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

export default CreateMedicinePage;
