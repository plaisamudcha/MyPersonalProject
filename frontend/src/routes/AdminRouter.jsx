import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const DashboardPage = lazy(() => import("../pages/adminPages/DashboardPage"));
const RegisterDoctorPage = lazy(() =>
  import("../pages/adminPages/Doctor/RegisterDoctorPage")
);
const DoctorListsPage = lazy(() =>
  import("../pages/adminPages/Doctor/DoctorsListPage")
);
const PatientListPage = lazy(() =>
  import("../pages/adminPages/Patient/PatientsListPage")
);
const AppointmentListPage = lazy(() =>
  import("../pages/adminPages/Appointment/AppointmentsListPage")
);
const MedicinesListPage = lazy(() =>
  import("../pages/adminPages/Medicine/MedicinesListPage")
);
const StockLogsListPage = lazy(() =>
  import("../pages/adminPages/StockLog/StockLogsListPage")
);

const AdminRounter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "admin/register/doctor", element: <RegisterDoctorPage /> },
      { path: "admin/doctors", element: <DoctorListsPage /> },
      { path: "admin/patients", element: <PatientListPage /> },
      {
        path: "admin/appointments",
        element: <AppointmentListPage />,
      },
      { path: "admin/medicines", element: <MedicinesListPage /> },
      { path: "admin/stock-logs", element: <StockLogsListPage /> },
      { path: "admin/payments", element: <p>All list of payments</p> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default AdminRounter;
