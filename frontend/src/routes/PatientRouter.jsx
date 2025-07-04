import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const PatientLayout = lazy(() => import("../layouts/PatientLayout"));

const PatientRouter = createBrowserRouter([
  {
    path: "/",
    element: <PatientLayout />,
    children: [
      { index: true, element: <p>Dashboard</p> },
      { path: "patient/appointments", element: <p>Patient's Dashboard</p> },
      {
        path: "patient/medical-records",
        element: <p>Patient's appointments</p>,
      },
      { path: "patient/payments", element: <p>Patient's payments</p> },
      { path: "patient/profile", element: <p>Edit patient's profile</p> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default PatientRouter;
