import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputForm from "../../../components/InputForm";
import { Image } from "lucide-react";
import AddPicture from "../../../components/AddPicture";
import { toast } from "react-toastify";
import adminSchema from "../../../validation/adminValidate/adminSchema";
import usePatientStore from "../../../stores/usePatientStore";

function EditPatientPage({ resetForm, item, file, setFile }) {
  const [addPicture, setAddPicture] = useState(false);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const initialData = {
    firstName: item.user.firstName,
    lastName: item.user.lastName,
    email: item.user.email,
    phone: item.phone,
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
    resolver: yupResolver(adminSchema.updatePatient),
    shouldFocusError: true,
    defaultValues: initialData,
  });
  const onUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (file) {
        formData.append("profileImage", file);
      }
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      const res = await updatePatient(item.id, formData);
      await new Promise((rs) => setTimeout(rs, 1000));
      setFile("");
      document.getElementById(`updatePatient-form${item.id}`).close();
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
            Update patient {item.id}
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
              <InputForm
                name={"phone"}
                label={"Phone Number"}
                register={register("phone")}
                errors={errors}
                type="tel"
                placeholder="08x-xxxx-xxx"
              />
              {addPicture && <AddPicture file={file} setFile={setFile} />}
              <div className="flex justify-between border rounded-lg p-2 items-center cursor-pointer">
                <p>add patient's image</p>
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

export default EditPatientPage;
