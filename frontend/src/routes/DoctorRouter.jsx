import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const DoctorLayout = lazy(() => import("../layouts/DoctorLayout"));
const Dashboard = lazy(() => import("../pages/doctorPages/Dashboard"));
const AppointmentsPage = lazy(() =>
  import("../pages/doctorPages/AppointmentsPage")
);

const DoctorRouter = createBrowserRouter([
  {
    path: "/",
    element: <DoctorLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "doctor/appointments", element: <AppointmentsPage /> },
      {
        path: "doctor/medical-records",
        element: <p>Doctor's medical-records</p>,
      },
      {
        path: "doctor/medical-records/:id",
        element: <p>Edit medical-records by id</p>,
      },
      {
        path: "doctor/prescriptions",
        element: <p>Create prescription</p>,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default DoctorRouter;
