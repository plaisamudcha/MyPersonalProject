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
const PrescriptionByAppiontmentIdPage = lazy(() =>
  import("../pages/adminPages/Prescription/PrescriptionByAppointmentIdPage")
);
const PaymentByAppointmentIdPage = lazy(() =>
  import("../pages/adminPages/Payment/PaymentByAppointmentIdPage")
);
const AllPaymentPage = lazy(() =>
  import("../pages/adminPages/Payment/AllPaymentPage")
);
const GoToHomeRouter = lazy(() => import("../pages/GoToHomeRouter"));

const AdminRounter = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "admin/register/doctor", Component: RegisterDoctorPage },
      { path: "admin/doctors", Component: DoctorListsPage },
      { path: "admin/patients", Component: PatientListPage },
      {
        path: "admin/appointments",
        Component: AppointmentListPage,
      },
      { path: "admin/medicines", Component: MedicinesListPage },
      {
        path: "admin/prescriptions/:appointmentId",
        Component: PrescriptionByAppiontmentIdPage,
      },
      { path: "admin/stock-logs", Component: StockLogsListPage },
      { path: "admin/payments", Component: AllPaymentPage },
      {
        path: "admin/payments/:appointmentId",
        Component: PaymentByAppointmentIdPage,
      },
      { path: "*", Component: GoToHomeRouter },
    ],
  },
]);

export default AdminRounter;
