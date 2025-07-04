import { RouterProvider } from "react-router";
import { Suspense } from "react";
import useUserStore from "../stores/useUserStore";
import AdminRounter from "./AdminRouter";
import DoctorRouter from "./DoctorRouter";
import PatientRouter from "./PatientRouter";
import GuestRouter from "./GuestRouter";

function AppRouter() {
  const user = useUserStore((state) => state.user);
  const role = user?.role;
  const finalRouter =
    role === "ADMIN"
      ? AdminRounter
      : role === "DOCTOR"
      ? DoctorRouter
      : role === "PATIENT"
      ? PatientRouter
      : GuestRouter;
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">Loading...</p>
          <progress className="progress w-100"></progress>
        </div>
      }
    >
      <RouterProvider router={finalRouter} />
    </Suspense>
  );
}

export default AppRouter;
