import { ShieldUser } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import TimeFooter from "../components/TimeFooter";
import useUserStore from "../stores/useUserStore";

const nav = [
  { id: 1, name: "Dashboard", path: "/" },
  { id: 2, name: "Doctors's register", path: "/admin/register/doctor" },
  { id: 3, name: "Doctors", path: "/admin/doctors" },
  { id: 4, name: "Patients", path: "/admin/patients" },
  { id: 5, name: "Appointments", path: "/admin/appointments" },
  { id: 7, name: "Medicines", path: "/admin/medicines" },
  { id: 8, name: "Pharmacy Stock Log", path: "/admin/stock-logs" },
  { id: 9, name: "Payments", path: "/admin/payments" },
];

function AdminLayout() {
  const location = useLocation();
  const currentNav = nav.find((el) => el.path === location.pathname);
  const logout = useUserStore((state) => state.logout);
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <div className="flex flex-1 overflow-auto bg-gray-100 p-5 pb-0">
        <aside className="w-64 bg-blue-900 text-white p-6 space-y-4">
          <div className="flex items-center gap-4 text-2xl font-bold mb-8 overflow-auto">
            <ShieldUser size={35} /> ADMIN
          </div>
          <div className="flex flex-col gap-2">
            {nav.map((el) => (
              <Link
                key={el.id}
                to={el.path}
                className={`px-3 py-2 hover:bg-blue-700 ${
                  el.path === location.pathname
                    ? "bg-blue-700 scale-105 rounded-lg"
                    : ""
                }`}
                // onClick={() => setIsClick(el.name)}
              >
                {el?.name}
              </Link>
            ))}
          </div>
        </aside>
        <div className="flex-1 px-8 overflow-auto ">
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
                  A
                </div>
                <span>Admin</span>
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

export default AdminLayout;
