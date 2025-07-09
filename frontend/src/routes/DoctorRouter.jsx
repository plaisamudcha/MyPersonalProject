import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const DoctorLayout = lazy(() => import("../layouts/DoctorLayout"));
const Dashboard = lazy(() => import("../pages/doctorPages/Dashboard"));
const AppointmentsPage = lazy(() =>
  import("../pages/doctorPages/AppointmentsPage")
);
const AllMedicalRecordsPage = lazy(() =>
  import("../pages/doctorPages/AllMedicalRecordsPage")
);
const MedicalRecordsPage = lazy(() =>
  import("../pages/doctorPages/MedicalRecordsPage")
);
const AllPrescriptionsPage = lazy(() =>
  import("../pages/doctorPages/AllPrescriptionsPage")
);
const GoToHomeRouter = lazy(() => import("../pages/GoToHomeRouter"));

const DoctorRouter = createBrowserRouter([
  {
    path: "/",
    Component: DoctorLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "doctor/appointments", Component: AppointmentsPage },
      {
        path: "doctor/medical-records",
        Component: AllMedicalRecordsPage,
      },
      {
        path: "doctor/medical-records/:patientId/:appointmentId",
        Component: MedicalRecordsPage,
      },
      {
        path: "doctor/prescriptions",
        Component: AllPrescriptionsPage,
      },
      { path: "*", Component: GoToHomeRouter },
    ],
  },
]);

export default DoctorRouter;
