import defaultImage from "../assets/defaultImage.jpg";

function DoctorForm({ user }) {
  return (
    <div className="border rounded-xl p-6 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition">
      <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={user.doctor?.profileImage || defaultImage}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold">
        {user.firstName} {user.lastName}
      </h3>
      <p className="text-gray-500 mb-4">{user.doctor.specialization}</p>
    </div>
  );
}

export default DoctorForm;
