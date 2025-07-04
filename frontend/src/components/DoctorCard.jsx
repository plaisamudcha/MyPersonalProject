import defaultImage from "../assets/defaultImage.jpg";
import useDoctorStore from "../stores/useDoctorStore";
import { toast } from "react-toastify";

function DoctorCard({ item }) {
  const deleteDoctor = useDoctorStore((state) => state.deleteDoctor);
  const onDelete = async () => {
    try {
<<<<<<< HEAD
=======
      const email = prompt("Put email to delete");
      if (email !== item.user.email) return toast.info("Invalid email");
>>>>>>> c55d519 (second commit)
      const res = await deleteDoctor(item.id);
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
            <span className="badge badge-ghost">doctorId : {item.id}</span>
            <div className="badge badge-accent">{item.specialization}</div>
          </div>
          <div className="divider my-0"></div>
          <p className="badge badge-ghost badge-lg">Email :</p>
          <p className="text-lg">{item.user.email}</p>
          <div className="flex justify-end gap-3">
            <button
              className="btn btn-neutral"
              onClick={() => {
                document
                  .getElementById(`updateDoctor-form${item.id}`)
                  .showModal();
              }}
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

export default DoctorCard;
