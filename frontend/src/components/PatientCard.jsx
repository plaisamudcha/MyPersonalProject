import defaultImage from "../assets/defaultImage.jpg";
import { toast } from "react-toastify";
import usePatientStore from "../stores/usePatientStore";

function PatientCard({ item, setIsOpenEdit, searchName }) {
  const deletePatient = usePatientStore((state) => state.deletePatient);
  const onDelete = async () => {
    try {
      const email = prompt("Put email to delete");
      if (email !== item.user.email) return toast.info("Invalid email");
      const res = await deletePatient(item.id, searchName);
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error.response?.data?.error || error.message;
      toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="flex items-center bg-base-100 w-120 shadow-lg px-3 rounded-lg">
        <div className="avatar">
          <div className="w-30 h-30 rounded-full">
            <img src={item.profileImage || defaultImage} />
          </div>
        </div>
        <div className="card-body">
          <h2 className="card-title">
            {item.user.firstName} {item.user.lastName}
          </h2>
          <div className="space-x-5">
            <span className="badge badge-ghost">patientId : {item.id}</span>
            <div className="badge badge-accent">{item.gender}</div>
          </div>
          <div className="divider my-0"></div>
          <p className="badge badge-ghost badge-lg">Email :</p>
          <p className="text-lg">{item.user.email}</p>
          <p className="badge badge-ghost badge-lg">Phone number :</p>
          <p className="text-lg">{item.phone}</p>
          <div className="flex justify-end gap-3">
            <button
              className="btn btn-neutral"
              onClick={() => setIsOpenEdit(item.id)}
            >
              Edit profile
            </button>
            <button className="btn btn-neutral" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientCard;
