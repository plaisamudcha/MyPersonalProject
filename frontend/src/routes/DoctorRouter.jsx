import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const DoctorLayout = lazy(() => import("../layouts/DoctorLayout"));
const Dashboard = lazy(() => import("../pages/doctorPages/Dashboard"));
<<<<<<< HEAD
=======
const AppointmentsPage = lazy(() =>
  import("../pages/doctorPages/AppointmentsPage")
);
>>>>>>> c55d519 (second commit)

const DoctorRouter = createBrowserRouter([
  {
    path: "/",
    element: <DoctorLayout />,
    children: [
      { index: true, element: <Dashboard /> },
<<<<<<< HEAD
      { path: "doctor/appointments", element: <p>Doctor's appointment</p> },
=======
      { path: "doctor/appointments", element: <AppointmentsPage /> },
>>>>>>> c55d519 (second commit)
      {
        path: "doctor/medical-records",
        element: <p>Doctor's medical-records</p>,
      },
      {
        path: "doctor/medical-records/:id",
        element: <p>Edit medical-records by id</p>,
      },
      {
<<<<<<< HEAD
        path: "doctor/prescription/create",
=======
        path: "doctor/prescriptions",
>>>>>>> c55d519 (second commit)
        element: <p>Create prescription</p>,
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default DoctorRouter;
