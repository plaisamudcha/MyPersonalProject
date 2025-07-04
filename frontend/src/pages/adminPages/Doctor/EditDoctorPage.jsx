import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { Image } from "lucide-react";
import AddPicture from "../../../components/AddPicture";
import { toast } from "react-toastify";
import useDoctorStore from "../../../stores/useDoctorStore";
import adminSchema from "../../../validation/adminValidate/adminSchema";

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

function EditDoctorPage({ resetForm, item, file, setFile }) {
  const [addPicture, setAddPicture] = useState(false);
  const updateDoctor = useDoctorStore((state) => state.updateDoctor);
  const initialData = {
    firstName: item.user.firstName,
    lastName: item.user.lastName,
    email: item.user.email,
    specialization: item.specialization,
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
    resolver: yupResolver(adminSchema.updateDoctor),
    shouldFocusError: true,
    defaultValues: initialData,
  });
  const onUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("specialization", data.specialization);
      if (file) {
        formData.append("profileImage", file);
      }
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      const res = await updateDoctor(item.id, formData);
      setFile("");
      await new Promise((rs) => setTimeout(rs, 1000));
      document.getElementById(`updateDoctor-form${item.id}`).close();
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
            Update doctor {item.id}
          </h2>

          <form onSubmit={handleSubmit(onUpdate)}>
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
              <div>
                <label className="block mb-1 font-medium">Specialization</label>
                <select
                  className="w-full border px-3 py-2 rounded-md input input-accent"
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
              {addPicture && <AddPicture file={file} setFile={setFile} />}
              <div className="flex justify-between border rounded-lg p-2 items-center cursor-pointer">
                <p>add doctor's image</p>
                <div
                  className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-110"
                  onClick={() => setAddPicture((prv) => !prv)}
                >
                  <Image />
                </div>
              </div>
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

export default EditDoctorPage;
