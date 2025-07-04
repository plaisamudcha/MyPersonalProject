import { Link, Outlet, useLocation } from "react-router";
import useUserStore from "../stores/useUserStore";
import defaultImage from "../assets/defaultImage.jpg";
import TimeFooter from "../components/TimeFooter";

const nav = [
  { id: 1, name: "Dashboard", path: "/" },
  { id: 2, name: "Appointment", path: "/doctor/appointments" },
  { id: 3, name: "Medical record", path: "/doctor/medical-records" },
  { id: 4, name: "Prescription", path: "/doctor/prescriptions" },
];

function DoctorLayout() {
  const location = useLocation();
  const currentNav = nav.find((el) => el.path === location.pathname);
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
<<<<<<< HEAD
  console.log("user", user);
=======
>>>>>>> c55d519 (second commit)
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <div className="flex flex-1 overflow-auto bg-gray-100 p-5 pb-0">
        <aside className="w-64 bg-gray-300 py-6 space-y-4 flex flex-col items-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={user.doctor?.profileImage || defaultImage}
                alt="profileImage"
              />
            </div>
          </div>
          <p className="font-bold text-xl badge badge-secondary badge-xl ">
            {user.role}
          </p>
          <div className="w-full flex flex-col gap-2">
            {nav.map((el) => (
              <Link
                key={el.id}
                to={el.path}
                className={`p-3 hover:bg-blue-500 hover:text-white  ${
                  el.path === location.pathname ? "bg-blue-500 text-white" : ""
                }`}
              >
                {el.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className="flex-1 px-8 overflow-auto">
          <div className="flex justify-between items-center mb-8 bg-secondary p-5 fixed z-10 right-16 left-77">
            <h1 className="text-3xl font-bold text-shadow-xl text-white">
              {currentNav?.name}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                className="btn btn-lg btn-info rounded-full"
                onClick={() => logout()}
              >
                Logout
              </button>
              <div className="flex items-center space-x-2 bg-gray-200 rounded-full px-3 py-2">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  D
                </div>
                <span>Doctor</span>
              </div>
            </div>
          </div>
          <div className="pt-30">
            <Outlet />
          </div>
        </div>
      </div>
      <TimeFooter />
    </div>
  );
}

export default DoctorLayout;
